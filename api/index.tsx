import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  //imageAspectRatio: '1:1',
  title: 'hyperborea',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})


// Define the player object
let player = {
  name: 'player',
  life: 60,
  points: 3,
  lastInput: "a1",


 
};

// Define the enemy object
let enemy1 = {
  name: 'Enemy 1',
  life: 100,
};



type FarcasterID = string;
type playerScore = number;

let farcasterid: FarcasterID = '20359';
let playerscore: playerScore = 0;




interface DataItem {
  fid: string;
  score: number;

  // Add other properties if there are any
}

const validFrames: string[] = ['a1', 'a2', 'a3', 'i1', 'i2', 'i3', 'm1', 'm2', 'm3'];

// Array of image URLs with aspect ratio 1.22:1
const images = [
  { id: '1', url: '/bgs/empty.jpg' },
  { id: '2', url: '/bgs/complete3.jpg' },
  { id: '3', url: '/bgs/wrongInput.jpg' },
  { id: '4', url: '/bgs/icon.png' },
  { id: '5', url: '/bgs/ambushed.jpg' },

];




const validGrid = [
  { id: 'a1', xPos: 3 , yPos: 5 },
  { id: 'a2', xPos: 3 , yPos: 17 },
  { id: 'a3', xPos: 3 , yPos: 29 },
  { id: 'a4', xPos: 3 , yPos: 42 },
  { id: 'a5', xPos: 3 , yPos: 54 },
  { id: 'a6', xPos: 3 , yPos: 66.99 },
  { id: 'a7', xPos: 3 , yPos: 79.6 },
  { id: 'a8', xPos: 3 , yPos: 92 },
  { id: 'b1', xPos: 10.2 , yPos: 5 },
  { id: 'b2', xPos: 10.2 , yPos: 17 },
  { id: 'b3', xPos: 10.2 , yPos: 29 },
  { id: 'b4', xPos: 10.2 , yPos: 42 },
  { id: 'b5', xPos: 10.2 , yPos: 54 },
  { id: 'b6', xPos: 10.2 , yPos: 66.99 },
  { id: 'b7', xPos: 10.2 , yPos: 79.6 },
  { id: 'b8', xPos: 10.2 , yPos: 92 },
  { id: 'c1', xPos: 17 , yPos: 5 },
  { id: 'c2', xPos: 17 , yPos: 17 },
  { id: 'c3', xPos: 17 , yPos: 29 },
  { id: 'c4', xPos: 17 , yPos: 42 },
  { id: 'c5', xPos: 17 , yPos: 54 },
  { id: 'c6', xPos: 17 , yPos: 66.99 },
  { id: 'c7', xPos: 17 , yPos: 79.6 },
  { id: 'c8', xPos: 17 , yPos: 92 },
  { id: 'd1', xPos: 23 , yPos: 5 },
  { id: 'd2', xPos: 23 , yPos: 17 },
  { id: 'd3', xPos: 23 , yPos: 29 },
  { id: 'd4', xPos: 23 , yPos: 42 },
  { id: 'd5', xPos: 23 , yPos: 54 },
  { id: 'd6', xPos: 23 , yPos: 66.99 },
  { id: 'd7', xPos: 23 , yPos: 79.6 },
  { id: 'd8', xPos: 23 , yPos: 92 },
  { id: 'e1', xPos: 30 , yPos: 5 },
  { id: 'e2', xPos: 30 , yPos: 17 },
  { id: 'e3', xPos: 30 , yPos: 29 },
  { id: 'e4', xPos: 30 , yPos: 42 },
  { id: 'e5', xPos: 30 , yPos: 54 },
  { id: 'e6', xPos: 30 , yPos: 66.99 },
  { id: 'e7', xPos: 30 , yPos: 79.6 },
  { id: 'e8', xPos: 30 , yPos: 92 },
  { id: 'f1', xPos: 36.5 , yPos: 5 },
  { id: 'f2', xPos: 36.5 , yPos: 17 },
  { id: 'f3', xPos: 36.5 , yPos: 29 },
  { id: 'f4', xPos: 36.5 , yPos: 42 },
  { id: 'f5', xPos: 36.5 , yPos: 54 },
  { id: 'f6', xPos: 36.5 , yPos: 66.99 },
  { id: 'f7', xPos: 36.5 , yPos: 79.6 },
  { id: 'f8', xPos: 36.5 , yPos: 92 },
  { id: 'g1', xPos: 43.2 , yPos: 5 },
  { id: 'g2', xPos: 43.2 , yPos: 17 },
  { id: 'g3', xPos: 43.2 , yPos: 29 },
  { id: 'g4', xPos: 43.2 , yPos: 42 },
  { id: 'g5', xPos: 43.2 , yPos: 54 },
  { id: 'g6', xPos: 43.2 , yPos: 66.99 },
  { id: 'g7', xPos: 43.2 , yPos: 79.6 },
  { id: 'g8', xPos: 43.2 , yPos: 92 },
  { id: 'h1', xPos: 50 , yPos: 5 },
  { id: 'h2', xPos: 50 , yPos: 17 },
  { id: 'h3', xPos: 50 , yPos: 29 },
  { id: 'h4', xPos: 50 , yPos: 42 },
  { id: 'h5', xPos: 50 , yPos: 54 },
  { id: 'h6', xPos: 50 , yPos: 66.99 },
  { id: 'h7', xPos: 50 , yPos: 79.6 },
  { id: 'h8', xPos: 50 , yPos: 92 },
  { id: 'i1', xPos: 56.4 , yPos: 5 },
  { id: 'i2', xPos: 56.4 , yPos: 17 },
  { id: 'i3', xPos: 56.4 , yPos: 29 },
  { id: 'i4', xPos: 56.4 , yPos: 42 },
  { id: 'i5', xPos: 56.4 , yPos: 54 },
  { id: 'i6', xPos: 56.4 , yPos: 66.99 },
  { id: 'i7', xPos: 56.4 , yPos: 79.6 },
  { id: 'i8', xPos: 56.4 , yPos: 92 },
  { id: 'j1', xPos: 63 , yPos: 5 },
  { id: 'j2', xPos: 63 , yPos: 17 },
  { id: 'j3', xPos: 63 , yPos: 29 },
  { id: 'j4', xPos: 63 , yPos: 42 },
  { id: 'j5', xPos: 63 , yPos: 54 },
  { id: 'j6', xPos: 63 , yPos: 66.99 },
  { id: 'j7', xPos: 63 , yPos: 79.6 },
  { id: 'j8', xPos: 63 , yPos: 92 },
  { id: 'k1', xPos: 69.6 , yPos: 5 },
  { id: 'k2', xPos: 69.6 , yPos: 17 },
  { id: 'k3', xPos: 69.6 , yPos: 29 },
  { id: 'k4', xPos: 69.6 , yPos: 42 },
  { id: 'k5', xPos: 69.6 , yPos: 54 },
  { id: 'k6', xPos: 69.6 , yPos: 66.99 },
  { id: 'k7', xPos: 69.6 , yPos: 79.6 },
  { id: 'k8', xPos: 69.6 , yPos: 92 },
  { id: 'l1', xPos: 76.3 , yPos: 5 },
  { id: 'l2', xPos: 76.3 , yPos: 17 },
  { id: 'l3', xPos: 76.3 , yPos: 29 },
  { id: 'l4', xPos: 76.3 , yPos: 42 },
  { id: 'l5', xPos: 76.3 , yPos: 54 },
  { id: 'l6', xPos: 76.3 , yPos: 66.99 },
  { id: 'l7', xPos: 76.3 , yPos: 79.6 },
  { id: 'l8', xPos: 76.3 , yPos: 92 },
  { id: 'm1', xPos: 83 , yPos: 5 },
  { id: 'm2', xPos: 83 , yPos: 17 },
  { id: 'm3', xPos: 83 , yPos: 29 },
  { id: 'm4', xPos: 83 , yPos: 42 },
  { id: 'm5', xPos: 83 , yPos: 54 },
  { id: 'm6', xPos: 83 , yPos: 66.99 },
  { id: 'm7', xPos: 83 , yPos: 79.6 },
  { id: 'm8', xPos: 83 , yPos: 92 },
  { id: 'n1', xPos: 89.6 , yPos: 5 },
  { id: 'n2', xPos: 89.6 , yPos: 17 },
  { id: 'n3', xPos: 89.6 , yPos: 29 },
  { id: 'n4', xPos: 89.6 , yPos: 42 },
  { id: 'n5', xPos: 89.6 , yPos: 54 },
  { id: 'n6', xPos: 89.6 , yPos: 66.99 },
  { id: 'n7', xPos: 89.6 , yPos: 79.6 },
  { id: 'n8', xPos: 89.6 , yPos: 92 },
  { id: 'o1', xPos: 96.6 , yPos: 5 },
  { id: 'o2', xPos: 96.6 , yPos: 17 },
  { id: 'o3', xPos: 96.6 , yPos: 29 },
  { id: 'o4', xPos: 96.6 , yPos: 42 },
  { id: 'o5', xPos: 96.6 , yPos: 54 },
  { id: 'o6', xPos: 96.6 , yPos: 66.99 },
  { id: 'o7', xPos: 96.6 , yPos: 79.6 },
  { id: 'o8', xPos: 96.6 , yPos: 92 },
];

app.frame('/', (c) => {
    let image;
    let intents;

    image = '/1.jpg',
    intents = [     
      <Button action="/selectCo-ordinates">Enter Maison</Button>,
    ];
  return c.res({
    
    image: image,
    intents: intents
  })
});


app.frame('/selectCharacter', (c) => {
    let image;
    let intents;

    image = '/characters/charSelect.jpg',

    intents = [   
      <Button action="/selectArmor">Ayla</Button>,
    ];
  return c.res({
    
    image: image,
    intents: intents
  })
});





app.frame('/selectCo-ordinates', (c) => {
    let image;
    let intents;
    const { buttonValue, inputText, status, frameData, verified } = c;
    //addData(farcasterid, playerscore);
    const armorPlaceholder = `Remaining Points: ${player.points ?? ''}`;  
       
        image = (
          <div
              style={{
                  position: 'relative',  // Set the container to relative positioning
                  height: '100vh',
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
              }}
          >
              <img
                  src= {images[1].url}
                  alt="First Image"
                  style={{
                      width: '1190px',
                      height: '626px',
                  }}
              />


          </div>
      );
        
    // Define the intents array with TextInput and conditional Button
    intents = [
      <TextInput placeholder={armorPlaceholder} />,
      <Button action="/resolvePosition">Continue</Button>,

    ];

    return c.res({
        image: image,
        intents: intents
    });
}); 




app.frame('/resolvePosition', async (c) => {
    let image;
    let intents;
    const { buttonValue, inputText, status, frameData, verified } = c;
    const { fid } = frameData || {};
    console.log(inputText);
    // Create an array of valid IDs in lowercase
    const validMapGrid = validGrid.map(item => item.id.toLowerCase());

    // Convert inputText to lowercase
    const lowerCaseInputText = inputText.toLowerCase();
    player.lastInput = lowerCaseInputText;

    // Find the matching grid item, using lowercase for comparison
    const selectedItem = validGrid.find(item => item.id.toLowerCase() === lowerCaseInputText);


    // If selectedItem exists, log its xPos and yPos
    if (selectedItem) {
        console.log(`xPos: ${selectedItem.xPos}, yPos: ${selectedItem.yPos}`);
    }
    // Check if inputText exists, else set default error image
    if (!inputText) {
        image = images[2].url; // Set an error image or fallback
        console.log('No input provided!');
        
        intents = [
            <Button action="/selectCo-ordinates">Back</Button>,
        ];
        
        return c.res({
            image: image,
            intents: intents
        });
    }


    // Check if the input is valid
    if (validMapGrid.includes(lowerCaseInputText)) {
        // Check if the player has the item

        if (player.points > 0) {

            // go to selected input
            image = (
              <div
                  style={{
                      position: 'relative',  // Set the container to relative positioning
                      height: '100vh',
                      background: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                  }}
              >
                  <img
                      src= {images[0].url}
                      alt="First Image"
                      style={{
                          width: '1190px',
                          height: '626px',
                      }}
                  />

                  <img
                      src= {images[3].url}
                      alt="Second Image"
                      style={{
                        position: 'absolute',
                        width: '55px',
                        height: '55px',
                        top: `${selectedItem.yPos}%`,
                        left: `${selectedItem.xPos}%`,
                        transform: 'translate(-50%, -50%)',
                        }}
                    />
                  
                </div>
            );

            intents = [
              <Button action="/revealGrid">Reveal</Button>,
            ];

        } else {

            // no points remaining, wait for 24 hrs or buys some with moxie/degen
            image = images[2].url;
            intents = [
              <Button action="/">Back</Button>,
            ];
        }

    } else if (lowerCaseInputText === "sota") {

         // go to selected input
            image = (
              <div
                  style={{
                      position: 'relative',  // Set the container to relative positioning
                      height: '100vh',
                      background: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                  }}
              >
                  <img
                      src= {images[0].url}
                      alt="First Image"
                      style={{
                          width: '1190px',
                          height: '626px',
                      }}
                  />

                  <img
                      src= {images[3].url}
                      alt="Second Image"
                      style={{
                        position: 'absolute',
                        width: '55px',
                        height: '55px',
                        top: `29%`,
                        left: `23%`,
                        transform: 'translate(-50%, -50%)',
                        }}
                    />
                  
                </div>
            );

            intents = [
              <Button action="/revealGrid">Reveal</Button>,
            ];


    } else {

        // If inputText is not in validInventoryFrames, set an error image or response
        image = images[2].url;
        console.log('Invalid input!');
        intents = [
          <Button action="/selectCo-ordinates">Back</Button>,
        ];
    }



    return c.res({
        image: image,
        intents: intents
    });
});


//////////////////////////////////////////////////////////////


app.frame('/revealGrid', (c) => {
    let image;
    let intents;
    //console.log(player.lastInput);
    const assassinAttackScenes = ["o4", "o2", "o1", "o3"];

    if (assassinAttackScenes.includes(player.lastInput)) {
      //assassin scene

      image = '/cutscenes/stare.jpg';

      intents = [
      <Button action="/sotaFight">Fight</Button>,
      <Button action="/sotaFight">Flee !!</Button>,
      ];


    } else if (player.lastInput === "d1") {
      //dante

      image = '/cutscenes/dante.jpg';

      intents = [
      <Button action="/selectCo-ordinates">Flee !!</Button>,
      ];

    } else if (player.lastInput === "d3") {
      //dOJO

      image = '/cutscenes/academy.jpg';

      intents = [
      <Button.Link href="https://warpcast.com/~/channel/sota">Join SOTA</Button.Link>,
      ];

    } else if (player.lastInput === "sota") {
      //dOJO

      image = '/cutscenes/academy.jpg';

      intents = [
      <Button.Link href="https://warpcast.com/~/channel/sota">Join SOTA</Button.Link>,
      ];

    } else if (player.lastInput === "f3" || player.lastInput === "f4" || player.lastInput === "f5") {
      //bear

      image = '/cutscenes/bear.jpg';

      intents = [
      <Button action="/battle">Fight</Button>,
      <Button action="/selectCo-ordinates">Flee !!</Button>,
      ];

    } else {
      //battle

      image = images[2].url;
      intents = [
        <Button action="/">Back</Button>,
      ];

    }
  return c.res({
    
    image: image,
    intents: intents
  });
});





app.frame('/sotaFight', (c) => {
    let image;
    let intents;

    image = '/cutscenes/attack.jpg',

    intents = [
    <Button action="/sotaFight2">Yield</Button>,
    ];
  return c.res({
    
    image: image,
    intents: intents
  })
});


app.frame('/sotaFight2', (c) => {
    let image;
    let intents;

    image = '/cutscenes/attack2.jpg',

    intents = [
    <Button action="/selectCo-ordinates">Continue</Button>,
    ];
  return c.res({
    
    image: image,
    intents: intents
  })
});

//////////////////////////////////////////////////////////////


app.frame('/ambush', (c) => {
    let image;
    let intents;

    image = '/images/ambush.jpg',

    intents = [
    <Button action="/battle">Fight</Button>,
    ];
  return c.res({
    
    image: image,
    intents: intents
  })
});




// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
