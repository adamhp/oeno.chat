'use client';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import cx from 'classnames';
import { motion, useAnimate, useAnimation, useCycle } from 'framer-motion';

interface WinePairing {
  grape: string;
  grape_color: string;
  grape_description: string;
  recommendations: string[];
  reasoning: string[];
}

const mockData: WinePairing[] = [
  {
    grape: 'Riesling',
    grape_color: 'white',
    grape_description:
      'An aromatic white grape variety known for its high acidity and versatile flavor profile.',
    recommendations: [
      '2019 Dr. Loosen Estate Riesling',
      '2018 Pewsey Vale Riesling',
      '2018 Eroica Riesling',
    ],
    reasoning: [
      '🍋 The bright acidity of the Riesling will cut through the richness of the Pad Thai sauce.',
      '🍯 The honeyed notes in the Riesling will complement the sweetness of the shrimp.',
      '🌿 The floral and herbal undertones in the Riesling will enhance the fragrant aromas of the Pad Thai.',
    ],
  },
  {
    grape: 'Gewürztraminer',
    grape_color: 'white',
    grape_description:
      'A highly aromatic white grape variety known for its intense floral and spicy notes.',
    recommendations: [
      '2018 Hugel Gewürztraminer',
      '2017 Trimbach Gewürztraminer',
      '2018 Domaine Zind-Humbrecht Gewürztraminer',
    ],
    reasoning: [
      '🌺 The floral aromas in Gewürztraminer will complement the fragrant spices in the Pad Thai.',
      '🍍 The tropical fruit notes in Gewürztraminer will complement the sweetness of the shrimp.',
      '🧀 The spicy and slightly oily texture of Gewürztraminer will pair well with the nutty flavor of the Pad Thai.',
    ],
  },
  {
    grape: 'Pinot Noir',
    grape_color: 'red',
    grape_description:
      'A red grape variety known for its light to medium-bodied structure and delicate aromas.',
    recommendations: [
      '2019 Meiomi Pinot Noir',
      '2018 La Crema Pinot Noir',
      '2017 Cloudy Bay Pinot Noir',
    ],
    reasoning: [
      '🍓 The fruity and floral aromas in Pinot Noir will complement the fragrant herbs and spices in the Pad Thai.',
      "🍷 The light-bodied structure of Pinot Noir won't overpower the delicate flavors of the shrimp and noodles.",
      '🧊 The slight chill on the Pinot Noir will enhance the refreshing quality of the Pad Thai.',
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

const fetchWinePairing = async (query: string) =>
  await fetch('/q', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ query }), // body data type must match "Content-Type" header
  })
    .then(async (res) => {
      const data = await res.json();
      console.log('Response', data);
      return data;
    })
    .catch((err) => {
      console.error('Error', err);
      throw err;
    });

export default function Home() {
  const [response, setResponse] = useState<WinePairing[]>();
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const cardRefs = [card1Ref, card2Ref, card3Ref];

  useEffect(() => {
    if (card1Ref.current) {
      const x = card1Ref.current.getBoundingClientRect().x;
      animate(
        '#blob1',
        {
          top: 0,
          left: 0,
          x: [null, x],
          y: [null, card1Ref.current.getBoundingClientRect().y / 2],
        },
        { duration: 2, ease: 'easeInOut' },
      ).then(() => {
        animate(
          '#blob1',
          {
            x: [
              x,
              x + Math.random() * 50,
              x - Math.random() * 50,
              x + Math.random() * 50,
              x,
            ],
          },
          { duration: 10, ease: 'easeInOut' },
        );
      });
    }
    if (card2Ref.current) {
      const x = card2Ref.current.getBoundingClientRect().x;
      animate(
        '#blob2',
        {
          top: 0,
          left: 0,
          x: [null, x],
          y: [null, card2Ref.current.getBoundingClientRect().y / 2],
        },
        { duration: 2, ease: 'easeInOut', delay: 0.2 },
      ).then(() => {
        animate(
          '#blob2',
          {
            x: [
              x,
              x + Math.random() * 50,
              x - Math.random() * 50,
              x + Math.random() * 50,
              x,
            ],
          },
          { duration: 10, ease: 'easeInOut' },
        );
      });
    }
    if (card3Ref.current) {
      const x = card3Ref.current.getBoundingClientRect().x;
      animate(
        '#blob3',
        {
          top: 0,
          left: 0,
          x: [null, x],
          y: [null, card3Ref.current.getBoundingClientRect().y / 2],
        },
        { duration: 2, ease: 'easeInOut', delay: 0.4 },
      ).then(() => {
        animate(
          '#blob3',
          {
            x: [
              x,
              x + Math.random() * 50,
              x - Math.random() * 50,
              x + Math.random() * 50,
              x,
            ],
          },
          { duration: 10, ease: 'easeInOut' },
        );
      });
    }
  }, [scope, card1Ref, card2Ref, card3Ref, response]);

  const blob1InitialPos = window.innerWidth / 5 + 100;
  const blob2InitialPos = (window.innerWidth / 5) * 2;
  const blob3InitialPos = (window.innerWidth / 5) * 3 - 100;

  return (
    <main className='flex flex-col items-center justify-center h-screen min-w-screen bg-slate-800'>
      <div
        className='absolute inset-x-0 inset-y-0 h-screen w-screen'
        ref={scope}
        id='blobs'
      >
        <motion.div
          animate={{
            x: [
              blob1InitialPos,
              blob1InitialPos + Math.random() * 50,
              blob1InitialPos - Math.random() * 50,
              blob1InitialPos + Math.random() * 50,
              blob1InitialPos,
            ],
            y: [
              0,
              0 + Math.random() * 50,
              0 - Math.random() * 50,
              0 + Math.random() * 50,
              0,
            ],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          id='blob1'
          className='absolute rounded-full mix-blend-screen filter blur-2xl top-8 opacity-70 w-72 h-72 bg-cyan-500'
        />
        <motion.div
          animate={{
            x: [
              blob2InitialPos,
              blob2InitialPos + Math.random() * 50,
              blob2InitialPos - Math.random() * 50,
              blob2InitialPos + Math.random() * 50,
              blob2InitialPos,
            ],
            y: [
              0,
              0 + Math.random() * 50,
              0 - Math.random() * 50,
              0 + Math.random() * 50,
              0,
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          id='blob2'
          className='absolute rounded-full mix-blend-screen filter blur-2xl top-8 opacity-70 w-72 h-72 bg-indigo-500'
        />
        <motion.div
          animate={{
            x: [
              blob3InitialPos,
              blob3InitialPos + Math.random() * 50,
              blob3InitialPos - Math.random() * 50,
              blob3InitialPos + Math.random() * 50,
              blob3InitialPos,
            ],
            y: [
              0,
              0 + Math.random() * 50,
              0 - Math.random() * 50,
              0 + Math.random() * 50,
              0,
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          id='blob3'
          className='absolute rounded-full mix-blend-screen filter blur-2xl top-8 opacity-70 w-72 h-72 bg-orange-500'
        />
      </div>
      <div className='w-full max-w-2xl'>
        <FormInput {...{ response, setResponse }} />
      </div>
      <div className='h-3/5'>
        <CardDisplay cardRefs={cardRefs} pairings={response} />
      </div>
    </main>
  );
}

interface FormInputProps {
  response: WinePairing[] | undefined;
  setResponse: Dispatch<SetStateAction<WinePairing[] | undefined>>;
}

function FormInput({ response, setResponse }: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const inputCtrls = useAnimation();
  const [example, cycleExample] = useCycle(
    'spicy shrimp pad thai',
    'steak and potatoes',
    'chicken parmesan',
  );

  useEffect(() => {
    if (inputCtrls) {
      inputCtrls.start('visible');
      setTimeout(() => {
        inputCtrls.start('hidden');
        setTimeout(() => {
          cycleExample();
        }, 1000);
      }, 5000);
    }
  }, [inputCtrls, example]);

  const handleSubmit = async () => {
    setLoading(true);
    // setResponse(await fetchWinePairing(value));
    // setLoading(false);
    setTimeout(() => {
      setLoading(false);
      console.log('Response', response);
      setResponse(mockData);
    }, 1000);
  };

  return (
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
              {
                hidden: !!value,
              },
              'pointer-events-none flex select-none items-center text-gray-500 absolute inset-y-0 left-32',
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
          {!loading ? (
            'Go!'
          ) : (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-indigo-700 animate-spin fill-white'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}

interface CardDisplayProps {
  cardRefs: RefObject<HTMLDivElement>[];
  pairings: WinePairing[] | undefined;
}

function CardDisplay({ cardRefs, pairings }: CardDisplayProps) {
  const cardCtrls = useAnimation();

  useEffect(() => {
    if (pairings?.length) {
      cardCtrls.start('visible');
    }
  }, [pairings]);

  return (
    <motion.div
      aria-hidden='true'
      initial='hidden'
      animate={cardCtrls}
      variants={cardsAnimation}
      className='space-x-3 flex flex-row items-top relative w-full h-full max-w-screen-2xl'
    >
      {pairings?.map((wine, i) => (
        <Card ref={cardRefs[i]} wine={wine} key={wine.grape} />
      ))}
    </motion.div>
  );
}

interface Card {
  wine: WinePairing;
}

const Card = forwardRef<HTMLDivElement, Card>(({ wine }: Card, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={cardAnimation}
      className='flex flex-col p-4 w-1/3 bg-gray-50 rounded-lg'
    >
      <div className='h-1/3'>
        <div className='flex flex-row items-center justify-between'>
          <h3 className='w-full lg:text-2xl font-black text-gray-800 text-lg'>
            {wine.grape}
          </h3>
          <div
            className={cx({
              'w-5 h-5 rounded-full ring-2 ring-gray-300 ring-offset-0': true,
              'bg-red-600/50': wine.grape_color.toLowerCase() === 'red',
              'bg-yellow-100/75': wine.grape_color.toLowerCase() === 'white',
            })}
          ></div>
        </div>
        <p className='mt-2 lg:text-xl text-gray-800'>
          {wine.grape_description}
        </p>
      </div>
      <ul className='h-1/3 mt-2 text-gray-800 lg:text-lg'>
        {wine.reasoning.map((reason, index) => (
          <li key={`${wine.grape}-reason-${index}`}>{reason}</li>
        ))}
      </ul>
      <span className='mt-4 text-gray-700 font-semibold mb-2'>
        Recommendations:
      </span>
      <ul className='ml-2 space-y-2'>
        {wine.recommendations.map((rec, index) => (
          <li key={`${wine.grape}-rec-${index}`}>{rec}</li>
        ))}
      </ul>
    </motion.div>
  );
});
