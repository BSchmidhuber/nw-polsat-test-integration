"use client"

import { BaseLayoutDesktop } from '@nativewaves/exp-core-playback';
// import { ExperienceBaseStandalone } from '@nativewaves/exp-default';
// import { Env, PlaybackContainer ,VideoPlayerUrl, VideoPlayerContainer, ExperiencePlayer, BaseLayoutDesktop} from '@nativewaves/exp-core';
import {PlaybackContainer, VideoPlayerContainer,VideoPlayerUrl, ExperiencePlayer, PlayPauseButton,VideoControlsTemplateDesktop } from '@nativewaves/exp-core-playback';


type ExperienceProps = {
  manifestId: string;
  envType: string;
}

const Experience: React.FC<ExperienceProps> = ({ manifestId, envType }) => {
return (
      <PlaybackContainer
        manifestId={manifestId}
        envType={envType as any}
      >
      <>
        <span>{manifestId}, {envType}</span>
        <VideoPlayerContainer>
        {/* <VideoPlayerUrl src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"/>  */}
           
            <ExperiencePlayer/> 
            {/* <VideoControlsTemplateDesktop>test</VideoControlsTemplateDesktop>
            <div style={{zIndex:1000, position:'relative'}}>
            <PlayPauseButton size="small"/>
            </div> */}
           <BaseLayoutDesktop templateProps={{show: true}} /> 
        </VideoPlayerContainer>
         </>
    </PlaybackContainer>
   
    
  );
};

export default Experience;
