import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledWhatIDoSection = styled.section`
  max-width: 900px;

  .inner {
    display: flex;
    flex-direction: column;
  }

  .intro-section {
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-gap: 50px;
    align-items: center;
    margin-bottom: 60px;

    @media (max-width: 768px) {
      display: block;
      margin-bottom: 50px;
    }

    .illustration {
      width: 350px;
      height: 280px;
      background: linear-gradient(135deg, #0a192f 0%, #112240 100%);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      border: 2px solid rgba(100, 255, 218, 0.2);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 70%, rgba(100, 255, 218, 0.1) 0%, transparent 50%);
      }

      .network-svg {
        z-index: 1;
        width: 200px;
        height: 150px;
      }

      @media (max-width: 768px) {
        width: 100%;
        max-width: 350px;
        margin: 0 auto 30px;
      }
    }

    .intro-text {
      h3 {
        font-size: var(--fz-xxl);
        color: var(--lightest-slate);
        margin-bottom: 20px;
        font-weight: 600;
      }

      p {
        color: var(--slate);
        font-size: var(--fz-lg);
        line-height: 1.6;
        margin-bottom: 20px;
      }
    }
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: 25px;
    }
  }

  .category-card {
    background: linear-gradient(135deg, rgba(100, 255, 218, 0.05) 0%, rgba(100, 255, 218, 0.02) 100%);
    border-radius: var(--border-radius);
    padding: 30px 25px;
    border: 1px solid rgba(100, 255, 218, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--green) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-5px);
      background: linear-gradient(135deg, rgba(100, 255, 218, 0.08) 0%, rgba(100, 255, 218, 0.04) 100%);
      border-color: rgba(100, 255, 218, 0.3);
      box-shadow: 0 10px 30px rgba(2, 12, 27, 0.7);

      &::before {
        opacity: 1;
      }
    }

    h3 {
      font-size: var(--fz-xl);
      color: var(--lightest-slate);
      margin-bottom: 20px;
      font-weight: 600;
      text-align: center;
    }

    .tech-showcase {
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
      margin-bottom: 20px;
      min-height: 70px;
      align-items: center;
    }

    ul {
      ${({ theme }) => theme.mixins.fancyList};
    }

    &.primary {
      border-color: rgba(100, 255, 218, 0.3);
      background: linear-gradient(135deg, rgba(100, 255, 218, 0.08) 0%, rgba(100, 255, 218, 0.04) 100%);
    }
  }
`;

const StyledTechIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.bgColor || 'rgba(255, 255, 255, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    border-color: var(--green);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    background: ${props => props.hoverColor || 'rgba(255, 255, 255, 0.1)'};
  }

  img {
    width: 35px;
    height: 35px;
    object-fit: contain;
  }

  .tech-name {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--fz-xxs);
    color: var(--slate);
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
    font-weight: 500;
  }

  &:hover .tech-name {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;

    img {
      width: 30px;
      height: 30px;
    }
  }
`;

const NetworkSVG = () => (
  <svg viewBox="0 0 200 150" className="network-svg">
    {/* Animated background grid */}
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100, 255, 218, 0.1)" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="200" height="150" fill="url(#grid)"/>
    
    {/* Network connections with glow */}
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Dynamic connections */}
    <line x1="50" y1="30" x2="100" y2="20" stroke="#64ffda" strokeWidth="2" opacity="0.6" filter="url(#glow)">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
    </line>
    <line x1="100" y1="20" x2="150" y2="35" stroke="#64ffda" strokeWidth="2" opacity="0.4" filter="url(#glow)"/>
    <line x1="50" y1="30" x2="30" y2="80" stroke="#64ffda" strokeWidth="2" opacity="0.5" filter="url(#glow)"/>
    <line x1="80" y1="70" x2="130" y2="75" stroke="#64ffda" strokeWidth="2" opacity="0.7" filter="url(#glow)">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite"/>
    </line>
    <line x1="110" y1="130" x2="160" y2="125" stroke="#64ffda" strokeWidth="2" opacity="0.5" filter="url(#glow)"/>
    
    {/* Network nodes with different sizes and animations */}
    <circle cx="50" cy="30" r="6" fill="#64ffda" opacity="0.9">
      <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="100" cy="20" r="8" fill="#64ffda" opacity="1">
      <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="150" cy="35" r="5" fill="#64ffda" opacity="0.7"/>
    <circle cx="30" cy="80" r="6" fill="#64ffda" opacity="0.8"/>
    <circle cx="80" cy="70" r="7" fill="#64ffda" opacity="0.9"/>
    <circle cx="130" cy="75" r="6" fill="#64ffda" opacity="0.8">
      <animate attributeName="r" values="6;9;6" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="110" cy="130" r="6" fill="#64ffda" opacity="0.8"/>
    <circle cx="160" cy="125" r="4" fill="#64ffda" opacity="0.6"/>
  </svg>
);

const TechIcon = ({ name, color, hoverColor, iconUrl }) => (
  <StyledTechIcon bgColor={color} hoverColor={hoverColor}>
    <img src={iconUrl} alt={name} />
    <span className="tech-name">{name}</span>
  </StyledTechIcon>
);

TechIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
};

const WhatIDo = () => {
  const revealContainer = useRef(null);
  const revealSections = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (revealContainer.current && sr) {
      sr.reveal(revealContainer.current, srConfig());
    }

    revealSections.current.forEach((ref, i) => {
      if (ref && sr) {
        sr.reveal(ref, srConfig(i * 100));
      }
    });
  }, [prefersReducedMotion]);

  return (
    <StyledWhatIDoSection id="whatido" ref={revealContainer}>
      <h2 className="numbered-heading">What I Do</h2>
      
      <div className="inner">
        <div className="intro-section" ref={el => (revealSections.current[0] = el)}>
          <div className="illustration">
            <NetworkSVG />
          </div>
          <div className="intro-text">
            <h3>Complex Networks Research</h3>
            <p>
              I specialize in complex networks research, combining machine learning 
              techniques with graph theory to solve real-world problems. My work involves 
              developing computational models and analyzing large-scale network data.
            </p>
          </div>
        </div>

        <div className="categories-grid">
          <div className="category-card primary" ref={el => (revealSections.current[1] = el)}>
            <h3>Machine Learning & Data Science</h3>
            <div className="tech-showcase">
              <TechIcon 
                name="PyTorch" 
                color="rgba(238, 76, 44, 0.1)" 
                hoverColor="rgba(238, 76, 44, 0.2)"
                iconUrl="https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg"
              />
              <TechIcon 
                name="Pandas" 
                color="rgba(21, 101, 192, 0.1)" 
                hoverColor="rgba(21, 101, 192, 0.2)"
                iconUrl="https://upload.wikimedia.org/wikipedia/commons/2/22/Pandas_mark.svg"
              />
              <TechIcon 
                name="NumPy" 
                color="rgba(19, 115, 186, 0.1)" 
                hoverColor="rgba(19, 115, 186, 0.2)"
                iconUrl="https://icon.icepanel.io/Technology/svg/NumPy.svg"
              />
              <TechIcon 
                name="Scikit-learn" 
                color="rgba(249, 157, 28, 0.1)" 
                hoverColor="rgba(249, 157, 28, 0.2)"
                iconUrl="https://icon.icepanel.io/Technology/svg/scikit-learn.svg"
              />
            </div>
            <ul>
              <li>Building neural networks for complex data analysis</li>
              <li>Developing machine learning models for research</li>
              <li>Data preprocessing and feature engineering</li>
              <li>Statistical analysis and visualization</li>
            </ul>
          </div>

          <div className="category-card" ref={el => (revealSections.current[2] = el)}>
            <h3>Programming Languages</h3>
            <div className="tech-showcase">
              <TechIcon 
                name="Python" 
                color="rgba(55, 118, 171, 0.1)" 
                hoverColor="rgba(55, 118, 171, 0.2)"
                iconUrl="https://icon.icepanel.io/Technology/svg/Python.svg"
              />
              <TechIcon 
                name="R" 
                color="rgba(39, 109, 195, 0.1)" 
                hoverColor="rgba(39, 109, 195, 0.2)"
                iconUrl="https://icon.icepanel.io/Technology/svg/R-.svg"
              />
              <TechIcon 
                name="MATLAB" 
                color="rgba(226, 107, 16, 0.1)" 
                hoverColor="rgba(226, 107, 16, 0.2)"
                iconUrl="https://icon.icepanel.io/Technology/svg/MATLAB.svg"
              />
            </div>
            <ul>
              <li>Advanced Python programming for scientific computing</li>
              <li>R for statistical analysis and data visualization</li>
              <li>MATLAB for mathematical modeling</li>
            </ul>
          </div>

          <div className="category-card" ref={el => (revealSections.current[3] = el)}>
            <h3>Development Tools</h3>
            <div className="tech-showcase">
              <TechIcon 
                name="Git" 
                color="rgba(240, 80, 51, 0.1)" 
                hoverColor="rgba(240, 80, 51, 0.2)"
                iconUrl="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg"
              />
              <TechIcon 
                name="Docker" 
                color="rgba(37, 150, 190, 0.1)" 
                hoverColor="rgba(37, 150, 190, 0.2)"
                iconUrl="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg"
              />
              <TechIcon 
                name="Linux" 
                color="rgba(255, 204, 0, 0.1)" 
                hoverColor="rgba(255, 204, 0, 0.2)"
                iconUrl="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linux.svg"
              />
              <TechIcon 
                name="VS Code" 
                color="rgba(0, 120, 215, 0.1)" 
                hoverColor="rgba(0, 120, 215, 0.2)"
                iconUrl="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg"
              />
            </div>
            <ul>
              <li>Version control with Git and collaborative workflows</li>
              <li>Containerization with Docker for reproducible environments</li>
              <li>Linux system administration and shell scripting</li>
            </ul>
          </div>

          <div className="category-card" ref={el => (revealSections.current[4] = el)}>
            <h3>Network Analysis & Research</h3>
            <div className="tech-showcase">
              <TechIcon 
                name="NetworkX" 
                color="rgba(255, 94, 77, 0.1)" 
                hoverColor="rgba(255, 94, 77, 0.2)"
                iconUrl="https://icon.icepanel.io/Technology/svg/NetworkX.svg"
              />
              <TechIcon 
                name="Plotly" 
                color="rgba(61, 174, 233, 0.1)" 
                hoverColor="rgba(61, 174, 233, 0.2)"
                iconUrl="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/plotly.svg"
              />
              <TechIcon 
                name="Matplotlib" 
                color="rgba(76, 175, 80, 0.1)" 
                hoverColor="rgba(76, 175, 80, 0.2)"
                iconUrl="https://icon.icepanel.io/Technology/svg/Matplotlib.svg"
              />
              <TechIcon 
                name="SciPy" 
                color="rgba(0, 101, 189, 0.1)" 
                hoverColor="rgba(0, 101, 189, 0.2)"
                iconUrl="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/scipy.svg"
              />
            </div>
            <ul>
              <li>Complex network modeling and analysis</li>
              <li>Graph algorithms and centrality measures</li>
              <li>Social network analysis and community detection</li>
              <li>Interactive data visualization and plotting</li>
            </ul>
          </div>
        </div>
      </div>
    </StyledWhatIDoSection>
  );
};

export default WhatIDo;