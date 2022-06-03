import React from 'react';
import './About.css';
import AboutCard from './AboutCard';

export default function About() {
  return (
    <main className='about-main'>
      <div className='about-container'>
        {/* Card for each member of the team, props passed in are individualized to the person */}
        <AboutCard 
          name={'Beau Elliott'} 
          image_url={'../assets/Beau-headshot copy.png'} 
          bio={'Beau: Full Stack Software developer, part time circus freak. Cloudy livin\' in Seattle, WA'} 
          architecture={'Art Deco'} 
          pinball={'The Addams Family'} 
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
          bio={'Elliott currently resides in Portland, OR and enjoys bands you\'ve probably never hear of.'} 
          architecture={'Brutalism'} 
          pinball={'Whirlwind'}  
          github_link={'https://github.com/ElliottProductions'} 
          linkedin_link={'https://www.linkedin.com/in/elliott-cheifetz/'}/>
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
