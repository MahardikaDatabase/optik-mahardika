import React, { useState, useEffect } from 'react';
import Navbar from '../LandingPage/Navbar';
import Footer from '../LandingPage/Footer';
import Wheel from './Wheel';
import WinnerModal from './WinnerModal';
import './LuckyWheel.css';

const DEFAULT_PRIZES = [
  "Kipas angin portabel",
  "Minyak goreng",
  "Tumbler",
  "Tempat kacamata",
  "Cash back 50",
  "Cash back 100",
  "Kacamata single vision",
  "Kacamata baca",
  "Belum beruntung"
];

const LuckyWheelPage = () => {
  const [prizes, setPrizes] = useState([]);
  const [winner, setWinner] = useState(null);
  
  // Customization state
  const [mainPrizeIndex, setMainPrizeIndex] = useState(-1);
  const [spinThreshold, setSpinThreshold] = useState(10);
  const [currentSpins, setCurrentSpins] = useState(0);

  // Poll for changes in case admin updates it in another tab
  useEffect(() => {
    const loadConfig = () => {
      const savedPrizes = localStorage.getItem('lw_prizes');
      if (savedPrizes) {
        setPrizes(JSON.parse(savedPrizes));
      } else {
        setPrizes(DEFAULT_PRIZES);
        localStorage.setItem('lw_prizes', JSON.stringify(DEFAULT_PRIZES));
      }

      const savedMainPrize = localStorage.getItem('lw_main_prize_index');
      if (savedMainPrize !== null) {
        setMainPrizeIndex(parseInt(savedMainPrize, 10));
      } else {
        // Default main prize is "Kacamata single vision" which is index 6
        setMainPrizeIndex(6);
        localStorage.setItem('lw_main_prize_index', '6');
      }

      const savedThreshold = localStorage.getItem('lw_spin_threshold');
      if (savedThreshold !== null) {
        setSpinThreshold(parseInt(savedThreshold, 10));
      } else {
        setSpinThreshold(10);
        localStorage.setItem('lw_spin_threshold', '10');
      }

      const savedSpins = localStorage.getItem('lw_current_spins');
      if (savedSpins !== null) {
        setCurrentSpins(parseInt(savedSpins, 10));
      } else {
        setCurrentSpins(0);
        localStorage.setItem('lw_current_spins', '0');
      }
    };

    loadConfig();
    
    // Listen for storage events (if changed in other tabs)
    window.addEventListener('storage', loadConfig);
    
    // Interval to poll (if changed in same tab but different route, though less likely)
    const interval = setInterval(loadConfig, 2000);
    
    return () => {
      window.removeEventListener('storage', loadConfig);
      clearInterval(interval);
    };
  }, []);

  const handleWinner = (winnerName, winningIndex) => {
    setWinner(winnerName);
    
    // If the main prize is won (which is only possible if canWinMainPrize is true),
    // we reset the counter back to 0.
    if (canWinMainPrize && winningIndex === mainPrizeIndex) {
      setCurrentSpins(0);
      localStorage.setItem('lw_current_spins', '0');
    } else {
      // Otherwise increment spins
      const newSpins = currentSpins + 1;
      setCurrentSpins(newSpins);
      localStorage.setItem('lw_current_spins', newSpins.toString());
    }
  };

  const canWinMainPrize = currentSpins >= spinThreshold;

  return (
    <div className="lucky-wheel-page">
      <Navbar />
      <div className="lucky-wheel-container">
        <Wheel 
          prizes={prizes} 
          onWinner={handleWinner} 
          canWinMainPrize={canWinMainPrize}
          mainPrizeIndex={mainPrizeIndex}
        />
      </div>
      <Footer />
      <WinnerModal 
        winner={winner} 
        onClose={() => setWinner(null)} 
      />
    </div>
  );
};

export default LuckyWheelPage;
