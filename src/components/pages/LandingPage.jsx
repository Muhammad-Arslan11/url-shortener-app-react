import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShortenUrl = (e)=>{
    e.preventDefault();
    // console.log(longUrl)
   if(longUrl) navigate(`/auth?createNew=${longUrl}`);

  }
  return (
    <div className='flex flex-col items-center'>
      <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>The only URL shortener <br/>you&rsquo;ll ever need! &#x1F447;</h2>

      <form className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
        <Input 
         className="h-full bg-gray-200 text-black border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="Enter your long URL"
        type="url"
        value={longUrl}
        onChange={(e)=>setLongUrl(e.target.value)}
        />
        <Button 
         className="h-full ml-2"
         type='submit' 
         variant="destructive"
         onClick={(e)=>handleShortenUrl(e)}
         >Shorten</Button>
      </form>
      <img src="/banner.jpeg" alt="banner" className='w-full m-11 md:px-11' />

     <Accordion type="multiple" collapsible="true" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the Trimrr URL shortener works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LandingPage