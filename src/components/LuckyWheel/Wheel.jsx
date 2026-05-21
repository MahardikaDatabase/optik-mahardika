import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const COLORS = [
  '#F37021', '#2E86C1', '#28B463', '#8E44AD', '#F1C40F',
  '#E74C3C', '#16A085', '#D35400', '#3498DB', '#9B59B6',
];

const Wheel = ({ prizes, onWinner, canWinMainPrize, mainPrizeIndex }) => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) - 10;

    ctx.clearRect(0, 0, size, size);

    if (prizes.length === 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1A2B33';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#F37021';
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = '500 22px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Belum ada hadiah', centerX, centerY);
      return;
    }

    const arc = (2 * Math.PI) / prizes.length;

    prizes.forEach((prize, i) => {
      const startAngle = i * arc;
      const endAngle = startAngle + arc;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      const fontSize = prizes.length > 12 ? 11 : prizes.length > 8 ? 13 : 16;
      ctx.font = `700 ${fontSize}px Outfit, sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 3;
      const maxLen = prizes.length > 10 ? 14 : 18;
      const text = prize.length > maxLen ? prize.substring(0, maxLen - 2) + '..' : prize;
      ctx.fillText(text, radius - 22, 4);
      ctx.restore();
    });

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.stroke();

  }, [prizes]);

  const spin = () => {
    if (isSpinning || prizes.length === 0) return;
    setIsSpinning(true);

    // --- Rigging logic ---
    // Decide the winning index FIRST, then calculate the rotation to land on it
    let winningIndex;

    if (canWinMainPrize && mainPrizeIndex >= 0 && mainPrizeIndex < prizes.length) {
      // GUARANTEED: Force the main prize
      winningIndex = mainPrizeIndex;
    } else if (mainPrizeIndex >= 0 && mainPrizeIndex < prizes.length) {
      // Must NOT land on main prize — pick a random OTHER segment
      const validIndices = prizes.map((_, i) => i).filter(i => i !== mainPrizeIndex);
      winningIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
    } else {
      // Fair spin — any segment can win
      winningIndex = Math.floor(Math.random() * prizes.length);
    }

    const degreesPerSegment = 360 / prizes.length;
    // The pointer is on the right (0°). The canvas segment 0 starts at 0° going clockwise.
    // To land the pointer in the middle of `winningIndex`, we need the wheel to be rotated backwards
    // by the segment's center angle.
    const segmentCenter = winningIndex * degreesPerSegment + degreesPerSegment / 2;
    // Add slight randomness within the segment to feel natural
    const jitter = (Math.random() - 0.5) * (degreesPerSegment * 0.6);
    
    let targetModulo = (360 - segmentCenter + jitter) % 360;
    if (targetModulo < 0) targetModulo += 360;

    const currentModulo = rotation % 360;
    let diff = targetModulo - currentModulo;
    if (diff <= 0) diff += 360; // Ensure it spins forward

    const extraSpins = (5 + Math.floor(Math.random() * 5)) * 360;
    const newRotation = rotation + diff + extraSpins;

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);

      // Fire confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F37021', '#ffffff', '#2E86C1', '#F1C40F']
      });

      if (onWinner) {
        onWinner(prizes[winningIndex], winningIndex);
      }
    }, 3200);
  };

  return (
    <div className="wheel-section">
      <div className="wheel-wrapper">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="wheel-canvas"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? 'transform 3s cubic-bezier(0.06, 0.7, 0.08, 1)'
              : 'none'
          }}
        />
        <div className="wheel-pointer"></div>
        <button
          className="spin-button"
          onClick={spin}
          disabled={isSpinning || prizes.length === 0}
        >
          PUTAR
        </button>
      </div>
    </div>
  );
};

export default Wheel;
