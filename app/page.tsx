'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import cx from 'classnames';
import { useAnimation, useInView, motion, useCycle } from 'framer-motion';
import Spinner from 'react-spinkit';

const response = [
  {
    grape: 'Riesling',
    grape_color: 'white',
    grape_description:
      'White grape known for its high acidity and ability to pair with spicy foods.',
    recommendations: [
      'Dr. Loosen Estate Riesling',
      'Chateau Ste. Michelle Riesling',
      'Trimbach Riesling',
    ],
    reasoning: [
      {
        '🌶️': 'High acidity cuts through the heat and balances the flavors of the dish',
      },
      {
        '🍇': 'Fruit and floral aromas complement the flavors of the shrimp and spices',
      },
      {
        '🍾': 'Slightly off-dry Riesling can balance the heat without being too sweet',
      },
    ],
  },
  {
    grape: 'Gewurztraminer',
    grape_color: 'white',
    grape_description:
      'White grape known for its intense aromas and full-bodied character.',
    recommendations: [
      'Trimbach Gewurztraminer',
      'Hugel Gewurztraminer',
      'Domaine Zind-Humbrecht Gewurztraminer',
    ],
    reasoning: [
      {
        '🌶️': 'Intense aromas and full-bodied character stand up to the bold flavors of the dish',
      },
      { '🍇': 'Low acidity balances the heat' },
    ],
  },
  {
    grape: 'Syrah/Shiraz',
    grape_color: 'red',
    grape_description: 'Red grape known for its dark fruit flavors and spice.',
    recommendations: [
      'Penfolds Koonunga Hill Shiraz',
      'Chateau Tanunda Grand Barossa Shiraz',
      'E. Guigal Crozes-Hermitage',
    ],
    reasoning: [
      {
        '🌶️': 'Dark fruit flavors and spice complement the flavors of the dish',
      },
      {
        '🍷': 'Medium to full-bodied character stands up to the bold flavors of the dish',
      },
      {
        '👅': 'Moderate tannins and acidity provide a nice contrast to the richness of the dish',
      },
    ],
  },
];

const wordAnimation = {
  hidden: {},
  visible: {},
};

const characterAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

const cardsAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 1.5,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const inputCtrls = useAnimation();
  const cardCtrls = useAnimation();
  const [example, cycleExample] = useCycle(
    'spicy shrimp pad thai',
    'steak and potatoes',
    'chicken parmesan',
  );

  useEffect(() => {
    inputCtrls.start('visible');
    setTimeout(() => {
      inputCtrls.start('hidden');
      setTimeout(() => {
        cycleExample();
      }, 1000);
    }, 5000);
  }, [inputCtrls, example]);

  const handleSubmit = () => {
    setTimeout(() => {
      setLoading(false);
      cardCtrls.start('visible');
    }, 2000);
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen min-w-full bg-slate-800'>
      <div className='relative w-full max-w-xl'>
        <div className='absolute rounded-full animate-blob mix-blend-screen filter blur-2xl opacity-70 -top-8 -right-8 w-72 h-72 bg-amber-300' />
        <div className='absolute rounded-full animate-blob animation-delay-2000 mix-blend-screen filter blur-2xl opacity-70 top-0 -left-2 w-72 h-72 bg-cyan-500' />
        <div className='absolute rounded-full animate-blob  mix-blend-screen filter blur-2xl opacity-70 -bottom-20 left-20 w-72 h-72 bg-pink-500' />

        <div className='m-8 relative space-y-4'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              handleSubmit();
            }}
            className='p-5 bg-white rounded-lg flex items-center justify-between space-x-4'
          >
            <div className='sm:text-sm md:text-lg h-10 relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md md:max-w-lg w-full'>
              <span className='flex select-none items-center pl-3 text-gray-500 '>
                I'm cooking
              </span>
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onFocus={() => {
                  setFocused(true);
                }}
                onBlur={() => {
                  setFocused(false);
                }}
                value={value}
                type='text'
                name='query'
                id='query'
                className='w-full block flex-1 border-0 bg-transparent pl-1.5 text-gray-800 focus:ring-0 sm:text-sm md:text-lg'
                placeholder=''
              />
              <span
                className={cx(
                  { hidden: !!value },
                  'pointer-events-none flex select-none items-center sm:pl-2 md:pl-4 text-gray-500 absolute inset-y-0 right-0 w-3/4',
                )}
              >
                {example.split(' ').map((word, index) => (
                  <motion.span
                    className='mr-1'
                    aria-hidden='true'
                    key={index}
                    initial='hidden'
                    animate={inputCtrls}
                    variants={wordAnimation}
                    transition={{
                      delayChildren: index * 0.2,
                      staggerChildren: 0.025,
                    }}
                  >
                    {word.split('').map((character, index) => {
                      return (
                        <motion.span
                          aria-hidden='true'
                          key={index}
                          variants={characterAnimation}
                        >
                          {character}
                        </motion.span>
                      );
                    })}
                  </motion.span>
                ))}
              </span>
            </div>
            <button className='flex flex-row justify-center items-center w-16 h-10 p-2 rounded-lg shadow-sm bg-indigo-500 text-white'>
              {!loading ? 'Go!' : <Spinner name='circle' color='white' />}
            </button>
          </form>
        </div>
      </div>
      <motion.div
        aria-hidden='true'
        initial='hidden'
        animate={cardCtrls}
        variants={cardsAnimation}
        className='space-x-4 flex flex-row items-center relative w-full max-w-5xl'
      >
        {response.map((wine, index) => (
          <motion.div
            variants={cardAnimation}
            key={index}
            className='flex flex-col p-4 w-96 h-[400px] bg-gray-100 rounded-lg'
          >
            <div className='h-1/3'>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='w-full font-black text-gray-800 text-lg'>
                  {wine.grape}
                </h3>
                <div
                  className={cx({
                    'w-4 h-4 rounded-full ring-2 ring-gray-300 ring-offset-0':
                      true,
                    'bg-red-600/50': wine.grape_color === 'red',
                    'bg-yellow-100/75': wine.grape_color === 'white',
                  })}
                ></div>
              </div>
              <p className='mt-2 text-gray-700'>{wine.grape_description}</p>
            </div>
            <ul className='h-1/3 mt-2 text-gray-700 text-sm'>
              {wine.reasoning.map((obj) =>
                Object.entries(obj).map(([k, v]) => (
                  <li>
                    {k} {v}
                  </li>
                )),
              )}
            </ul>
            <span className='mt-4 text-sm text-gray-600'>Try:</span>
            <ul className='text-sm'>
              {wine.recommendations.map((rec) => (
                <li>{rec}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
