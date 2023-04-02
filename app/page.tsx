'use client';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  createRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import cx from 'classnames';
import {
  AnimationControls,
  AnimationScope,
  motion,
  useAnimate,
  useAnimation,
  useCycle,
} from 'framer-motion';

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

const glassAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    y: 50,
    transition: {
      duration: 0.25,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 4,

      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

const promptCharacterAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

const characterAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 20,
    transition: {
      duration: 0.75,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
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

const randomMoveX = (x: number) => ({
  x: [x, x + Math.random() * 50],
});

const animateRandomMoveX = (
  animate: ReturnType<typeof useAnimate>[1],
  id: string,
  x: number,
) =>
  animate(id, randomMoveX(x), {
    duration: 10,
    ease: 'easeInOut',
    repeatType: 'reverse',
  });

const animateAllBlobsDefault = async (
  animate: ReturnType<typeof useAnimate>[1],
  width: number,
) => {
  await Promise.all([
    animate(
      '#blob1',
      {
        opacity: 1,
        top: 8,
        y: 0,
        x: width / 2 - 100,
      },
      { duration: 0.5, ease: 'easeInOut' },
    ),
    animate(
      '#blob2',
      {
        opacity: 1,
        top: 8,
        y: 0,
        x: width / 2 - 50,
      },
      { duration: 0.5, ease: 'easeInOut' },
    ),
    animate(
      '#blob3',
      {
        opacity: 1,
        top: 8,
        y: 0,
        x: width / 2,
      },
      { duration: 0.5, ease: 'easeInOut' },
    ),
  ]).then(() => {
    animateRandomMoveX(animate, '#blob1', width / 2 - 100);
    animateRandomMoveX(animate, '#blob2', width / 2 - 50);
    animateRandomMoveX(animate, '#blob3', width / 2);
  });
};

export default function Home() {
  const { width, height } = useWindowSize();
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [response, setResponse] = useState<WinePairing[] | undefined>(
    undefined,
  );
  const [scope, animate] = useAnimate();
  const loadingCtrls = useAnimation();
  const glassCtrls = useAnimation();
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const cardRefs = [card1Ref, card2Ref, card3Ref];

  const animateBlobsToCards = () => {
    if (card1Ref.current) {
      const x = card1Ref.current.getBoundingClientRect().x;
      animate(
        '#blob1',
        {
          top: 0,
          x: [null, x],
          y: [null, card1Ref.current.getBoundingClientRect().y / 2],
        },
        { duration: 1, ease: 'easeInOut' },
      ).then(() => {
        animateRandomMoveX(animate, '#blob1', x);
      });
    }
    if (card2Ref.current) {
      const x = card2Ref.current.getBoundingClientRect().x;
      animate(
        '#blob2',
        {
          top: 0,
          x: [null, x],
          y: [null, card2Ref.current.getBoundingClientRect().y / 2],
        },
        { duration: 1, ease: 'easeInOut', delay: 0.1 },
      ).then(() => {
        animateRandomMoveX(animate, '#blob2', x);
      });
    }
    if (card3Ref.current) {
      const x = card3Ref.current.getBoundingClientRect().x;
      animate(
        '#blob3',
        {
          top: 0,
          x: [null, x],
          y: [null, card3Ref.current.getBoundingClientRect().y / 2],
        },
        { duration: 1, ease: 'easeInOut', delay: 0.2 },
      ).then(() => {
        animateRandomMoveX(animate, '#blob3', x);
      });
    }
  };

  useEffect(() => {
    if (width > 800) {
      animateAllBlobsDefault(animate, width);
    }
  }, [width]);

  useEffect(() => {
    if (width > 800 && response) {
      animateBlobsToCards();
    }
  }, [width, response]);

  useEffect(() => {
    if (width > 800 && focused) {
      animateAllBlobsDefault(animate, width);
    }
  }, [width, focused]);

  useEffect(() => {
    if (loading) {
      setResponse([]);
      loadingCtrls.start('visible').then(() => {
        setTimeout(() => {
          loadingCtrls.start('hidden');
        }, 3000);
      });
      glassCtrls.start('visible').then(() => {
        setTimeout(() => {
          glassCtrls.start('hidden');
        }, 3000);
      });
    }
    if (!loading) {
      loadingCtrls.start('hidden');
      glassCtrls.start('hidden');
    }
  }, [loading]);

  return (
    <main className='flex flex-col w-full h-screen md:min-w-screen bg-slate-800 lg:items-center lg:justify-center overflow-hidden'>
      <Blobs {...{ scope, width, height }} />
      <div className='mx-auto w-full max-w-2xl'>
        <FormInput
          {...{
            loading,
            setLoading,
            focused,
            setFocused,
            response,
            setResponse,
          }}
        />
      </div>
      <div className='h-24'>
        {loading && <Loading {...{ loading, loadingCtrls, glassCtrls }} />}
      </div>
      <CardDisplay cardRefs={cardRefs} pairings={response} />
    </main>
  );
}

function Loading({
  loading,
  loadingCtrls,
  glassCtrls,
}: {
  loading: boolean;
  loadingCtrls: AnimationControls;
  glassCtrls: AnimationControls;
}) {
  return (
    <div className='relative text-center p-2 md:p-0 lg:mt-4'>
      {'Hang tight while our Sommelier finds the perfect wines for you...'
        .split(' ')
        .map((word, index) => (
          <motion.span
            className='mr-1 inline-block text-xl md:text-3xl font-black text-white'
            aria-hidden='true'
            initial='hidden'
            animate={loadingCtrls}
            variants={wordAnimation}
            transition={{
              delayChildren: index * 0.15,
              staggerChildren: 0.02,
            }}
          >
            {word.split('').map((character, index) => {
              return (
                <motion.span
                  className='inline-block'
                  key={`${character}-${index}`}
                  variants={characterAnimation}
                >
                  {character}
                </motion.span>
              );
            })}
          </motion.span>
        ))}
      {loading && (
        <motion.div
          initial='hidden'
          animate={glassCtrls}
          variants={glassAnimation}
          className='mt-24 absolute inset-x-0 justify-center'
        >
          <div className='glass-ctr'>
            <div className='glass'></div>
            <div className='water-ctr'>
              <div className='water'></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Blobs({
  scope,
  width,
  height,
}: {
  scope: AnimationScope<any>;
  width: number;
  height: number;
}) {
  return (
    <div
      className='hidden lg:block absolute h-screen w-screen'
      ref={scope}
      id='blobs'
    >
      <motion.div
        initial={{ opacity: 0, top: 8, y: 0, x: width / 2 - 100 }}
        id='blob1'
        className='absolute rounded-full mix-blend-screen filter blur-2xl top-8 opacity-70 w-72 h-72 bg-cyan-500'
      />
      <motion.div
        initial={{ opacity: 0, top: 8, y: 0, x: width / 2 - 50 }}
        id='blob2'
        className='absolute rounded-full mix-blend-screen filter blur-2xl top-8 opacity-70 w-72 h-72 bg-indigo-500'
      />
      <motion.div
        initial={{ opacity: 0, top: 8, y: 0, x: width / 2 }}
        id='blob3'
        className='absolute rounded-full mix-blend-screen filter blur-2xl top-8 opacity-70 w-72 h-72 bg-orange-500'
      />
    </div>
  );
}

interface FormInputProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  focused: boolean;
  setFocused: Dispatch<SetStateAction<boolean>>;
  response: WinePairing[] | undefined;
  setResponse: Dispatch<SetStateAction<WinePairing[] | undefined>>;
}

const examples = [
  'spicy shrimp pad thai',
  'chicken parmesan',
  'manchego cheese',
  'chocolate cake',
  'chicken tikka masala',
  'chicken pot pie',
  'chicken and dumplings',
  'eggplant parmigiana',
  'shrimp scampi',
  'mussels with white wine and butter',
];

function FormInput({
  loading,
  setLoading,
  focused,
  setFocused,
  response,
  setResponse,
}: FormInputProps) {
  const [value, setValue] = useState('');
  const inputCtrls = useAnimation();
  const [example, cycleExample] = useCycle(...examples);

  useEffect(() => {
    if (loading) {
      inputCtrls.start('hidden');
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      inputCtrls.start('hidden');
      return;
    }
    if (inputCtrls && !loading) {
      inputCtrls.start('visible').then(() => {
        inputCtrls.start('hidden').then(() => {
          cycleExample();
        });
      });
    }
  }, [inputCtrls, example, loading]);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(await fetchWinePairing(value));
    setLoading(false);
    // setTimeout(() => {
    //   setLoading(false);
    //   console.log('Response', response);
    //   setResponse(mockData);
    // }, 10000);
  };

  return (
    <div className='m-2 relative space-y-2 md:space-y-4'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          handleSubmit();
        }}
        className='p-2 md:p-5 bg-white rounded-lg flex items-center justify-between space-x-1 md:space-x-4'
      >
        <div className='sm:text-sm md:text-lg h-10 relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md md:max-w-lg w-full'>
          <span className='flex select-none items-center pl-2 text-gray-500 w-24'>
            I'm eating
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
            aria-label='Input'
            aria-disabled={loading}
            disabled={loading}
            value={value}
            type='text'
            name='query'
            id='query'
            className='-ml-3 w-full block flex-1 border-0 bg-transparent disabled:select-none disabled:text-gray-500 text-gray-800 focus:ring-0 sm:text-sm md:text-lg'
            placeholder=''
          />
          <span
            className={cx(
              {
                hidden: !!value,
              },
              'pointer-events-none flex select-none items-center text-gray-500 absolute inset-y-0 left-24',
            )}
          >
            {example.split(' ').map((word, index) => (
              <motion.span
                className='mr-1'
                aria-hidden='true'
                initial='hidden'
                animate={inputCtrls}
                variants={wordAnimation}
                transition={{
                  delayChildren: index * 0.2,
                  staggerChildren: 0.03,
                }}
              >
                {word.split('').map((character, index) => (
                  <motion.span
                    className='inline-block'
                    aria-hidden='true'
                    key={index}
                    variants={promptCharacterAnimation}
                  >
                    {character}
                  </motion.span>
                ))}
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
  const cardDisplayRef = useRef<HTMLDivElement>(null);
  const cardCtrls = useAnimation();

  useEffect(() => {
    if (pairings?.length) {
      cardCtrls.start('visible');
    } else {
      cardCtrls.start('hidden');
    }
  }, [pairings]);

  return (
    <>
      <motion.div
        ref={cardDisplayRef}
        id='card-display'
        aria-hidden='true'
        initial='hidden'
        animate={cardCtrls}
        variants={cardsAnimation}
        className='z-10 m-2 py-8 md:m-6 md:px-32 touch-pan-x snap-x snap-mandatory grid grid-flow-col scroll-mx-2 space-x-2 md:space-x-4 overflow-x-scroll h-full md:h-[60vh]'
      >
        {pairings?.map((wine, i) => (
          <Card
            cardDisplayRef={cardDisplayRef}
            ref={cardRefs[i]}
            wine={wine}
            key={wine.grape}
          />
        ))}
      </motion.div>
      <div className='p-2 lg:hidden flex flex-row justify-between text-white'>
        <button
          onClick={() => {
            cardDisplayRef.current?.scrollBy({
              left: -cardDisplayRef.current?.clientWidth,
            });
          }}
          className='w-12 p-2 text-white bg-gray-500 rounded-full'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
            <rect width='32' height='32' fill='none' />
            <path
              d='M120,32,24,128l96,96V176h88a8,8,0,0,0,8-8V88a8,8,0,0,0-8-8H120Z'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='16'
            />
          </svg>
        </button>
        <button
          onClick={() => {
            cardDisplayRef.current?.scrollBy({
              left: cardDisplayRef.current?.clientWidth,
            });
          }}
          className='w-12 p-2 text-white bg-gray-500 rounded-full'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
            <rect width='32' height='32' fill='none' />
            <path
              d='M136,32l96,96-96,96V176H48a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8h88Z'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='16'
            />
          </svg>
        </button>
      </div>
    </>
  );
}

interface Card {
  cardDisplayRef: RefObject<HTMLDivElement>;
  wine: WinePairing;
}

const Card = forwardRef<HTMLDivElement, Card>(
  ({ cardDisplayRef, wine }: Card, ref) => {
    return (
      <motion.div
        onMouseDown={(e) => {
          console.log(e);
        }}
        ref={ref}
        variants={cardAnimation}
        className='flex-none snap-center snap-always grid grid-flow-row w-[90vw] md:w-[80vw] lg:w-[30vw] p-3 md:p-4 bg-gray-50 rounded-lg'
      >
        <div>
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
        <ul className='space-y-2 mt-2 text-gray-800 text-sm md:text-base lg:text-lg'>
          {wine.reasoning.map((reason, index) => (
            <li key={`${wine.grape}-reason-${index}`}>{reason}</li>
          ))}
        </ul>
        <div>
          <span className='mt-4 text-gray-700 font-semibold mb-4'>
            Recommendations:
          </span>
          <ul className='ml-2 space-y-2'>
            {wine.recommendations.map((rec, index) => (
              <li key={`${wine.grape}-rec-${index}`}>{rec}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  },
);

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
