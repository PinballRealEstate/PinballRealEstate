import React from 'react';
import './About.css';
import AboutCard from './AboutCard';

export default function About() {
  return (
    <main className='about-main'>
      <div className='about-container'>
        <AboutCard 
          name={'Beau Elliott'} 
          image_url={'../assets/Beau-headshot copy.png'} 
          bio={'Beau currently resides in Seattle, WA and loves eating ramen, teaching pole dance, and rock climbing.'} 
          architecture={''} 
          pinball={''} 
          github_link={'https://github.com/belliott15'} 
          linkedin_link={'https://www.linkedin.com/in/beau-elliott15/'}/>
        <AboutCard 
          name={'Khayman King'} 
          image_url={'../assets/khaymanHeadshot.png'} 
          bio={'Alleged software developer, currently living in Western Washington'} 
          architecture={'Industrial'} 
          pinball={'Terminator 2'} 
          github_link={'https://github.com/khaymanaking'} 
          linkedin_link={'https://www.linkedin.com/in/khaymanaking/'}/>
        <AboutCard 
          name={'Elliott Cheifetz'} 
          image_url={'../assets/elliottHeadshot.png'} 
          bio={''} 
          architecture={''} 
          pinball={''}  
          github_link={''} 
          linkedin_link={''}/>
        <AboutCard 
          name={'Will Gunderson'} 
          image_url={'../assets/willHeadshot.png'} 
          bio={'Will is a software developer in training, currently living in Bend, OR.'} 
          architecture={'Cross Gabled Craftsman'} 
          pinball={'The Addams Family'} 
          github_link={'https://github.com/willgundy'} 
          linkedin_link={'https://www.linkedin.com/in/will-gunderson/'}/>
      </div>
    </main>
  );
}
