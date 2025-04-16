import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faPhone, faEnvelope, faMap } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'
const Footer = () => {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>Quick links</h3>
          <a href=" /"> <FontAwesomeIcon icon={faAngleRight} /> Home</a>
          <a href="/"> <FontAwesomeIcon icon={faAngleRight} /> about</a>
          <a href="/"> <FontAwesomeIcon icon={faAngleRight} /> package</a>
          <a href="/"> <FontAwesomeIcon icon={faAngleRight} /> Book</a>
        </div>
        <div className="box">
          <h3>Extra links</h3>
          <a href="contact"> <FontAwesomeIcon icon={faAngleRight} /> Ask questions</a>
          <a href="contact"> <FontAwesomeIcon icon={faAngleRight} /> About us</a>
          <a href="contact"> <FontAwesomeIcon icon={faAngleRight} /> Privacy policy</a>
          <a href="contact"> <FontAwesomeIcon icon={faAngleRight} /> Term of use</a>
        </div>

        <div className="box">
          <h3>Contact info</h3>
          <a href="https://www.whatsapp.com/?lang=fr"> <FontAwesomeIcon icon={faPhone} /> +212 65549-5342 </a>
          <a href="https://www.whatsapp.com/?lang=fr"> <FontAwesomeIcon icon={faPhone} /> +212 65549-5342 </a>
          <a href="https://mail.google.com/"> <FontAwesomeIcon icon={faEnvelope} /> routkidout@gmail.com </a>
          <a href="https://www.google.com/maps"> <FontAwesomeIcon icon={faMap} /> Rabat, Morocco, 100000 </a>
        </div>
        <div className="box">
          <h3>Follow us</h3>
          <a href="https://www.facebook.com/"> <FontAwesomeIcon icon={faFacebookF} /> Facebook </a>
          <a href="https://www.instagram.com/"> <FontAwesomeIcon icon={faInstagram} /> Instagram </a>
          <a href="#https://www.twitter.com/"> <FontAwesomeIcon icon={faTwitter} /> Twitter </a>
          <a href="https://www.Linkden.com/"> <FontAwesomeIcon icon={faLinkedin} /> Linkedin </a>
        </div>
      </div>

      <div className="credit">Created by <span>Outkidout Rabie</span> all right reserved!</div>
    </section>
  );
};

export default Footer;