"use client"
import { useTypewriter } from 'react-simple-typewriter';
import Image from 'next/image';

const LandingPage = () => {
    const [typeEffect] = useTypewriter({
        words: ['Empowering Businesses, Connecting Communities', 'Connecting People'],
        loop: true,
        delaySpeed: 700,
        deleteSpeed: 100,
    });

    return (
        <div className='h-full flex w-full bg-gray-900'>
            <div className="flex items-center justify-center text-gray-100 h-full" style={{ width: '50%' }}>
                <h1 className="text-5xl text-center font-bold mb-8">
                    <span>Welcome to CP -</span> {typeEffect}
                </h1>
            </div>
            <div className="flex items-center justify-center text-gray-100 h-full">
                <Image src="/background.jpeg" alt="background" width={800} height={800}/>
            </div>
        </div>
    );
};
export default LandingPage;