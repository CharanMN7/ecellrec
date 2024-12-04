import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import styles from './TeamCard.module.css';

interface TeamCardProps {
  role: string;
  name: string;
  socialLinks: { platform: string; url: string }[];
  imageUrl: any; // Path to the image
}

const TeamCard: React.FC<TeamCardProps> = ({ role, name, socialLinks, imageUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Use Next.js Image component for optimized image loading */}
        <Image 
          src={imageUrl} 
          alt={name} 
          layout="fill" 
          objectFit="cover" 
          className={styles.image}
        />
      </div>
      <div className={styles.infoOverlay}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.platform}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.role}>{role}</div>
    </div>
  );
};

export default TeamCard;
