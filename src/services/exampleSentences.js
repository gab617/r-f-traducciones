const SENTENCE_DB = {
  antelope: [
    { id: 1, text: "The antelope ran quickly across the savanna." },
    { id: 2, text: "We saw a herd of antelope near the watering hole." },
    { id: 3, text: "The antelope uses its speed to escape from predators." },
  ],
  bee: [
    { id: 1, text: "The bee landed on a bright yellow flower." },
    { id: 2, text: "A single bee can visit thousands of flowers in one day." },
    { id: 3, text: "The bee returned to its hive carrying pollen." },
  ],
  bird: [
    { id: 1, text: "A bird built its nest in the oak tree." },
    { id: 2, text: "The bird sang beautifully at sunrise." },
    { id: 3, text: "Every spring, that bird returns to the same garden." },
  ],
  bison: [
    { id: 1, text: "The bison roamed across the vast grassland." },
    { id: 2, text: "A bison can weigh over a thousand kilograms." },
    { id: 3, text: "We watched the bison graze peacefully in the field." },
  ],
  camel: [
    { id: 1, text: "The camel walked across the hot desert sand." },
    { id: 2, text: "A camel can survive without water for several weeks." },
    { id: 3, text: "We rode a camel to explore the ancient ruins." },
  ],
  cat: [
    { id: 1, text: "The cat curled up on the sofa and fell asleep." },
    { id: 2, text: "My cat chases a red laser pointer every evening." },
    { id: 3, text: "That cat has the softest fur I have ever felt." },
  ],
  crab: [
    { id: 1, text: "The crab scuttled sideways across the sandy beach." },
    { id: 2, text: "We found a small crab hiding under a rock." },
    { id: 3, text: "The crab uses its claws to catch food and defend itself." },
  ],
  dog: [
    { id: 1, text: "The dog wagged its tail when I walked through the door." },
    { id: 2, text: "My dog loves to fetch the ball at the park." },
    { id: 3, text: "That dog has been trained to help people with disabilities." },
  ],
  donkey: [
    { id: 1, text: "The donkey carried heavy loads up the mountain trail." },
    { id: 2, text: "We heard the donkey bray loudly from across the valley." },
    { id: 3, text: "The farmer used a donkey to pull the cart." },
  ],
  elephant: [
    { id: 1, text: "The elephant sprayed water over its back to cool down." },
    { id: 2, text: "An elephant can eat up to three hundred pounds of food each day." },
    { id: 3, text: "We watched the elephant use its trunk to reach the highest branches." },
  ],
  goat: [
    { id: 1, text: "The goat climbed effortlessly onto the steep cliff." },
    { id: 2, text: "Our goat eats almost anything, including old cardboard boxes." },
    { id: 3, text: "The goat bleated loudly until the farmer brought fresh hay." },
  ],
  horse: [
    { id: 1, text: "The horse galloped across the open field." },
    { id: 2, text: "She brushes her horse every morning before riding." },
    { id: 3, text: "The horse neighed when it saw its owner approaching." },
  ],
  monkey: [
    { id: 1, text: "The monkey swung from branch to branch in the jungle." },
    { id: 2, text: "We watched the monkey peel a banana with surprising skill." },
    { id: 3, text: "That monkey communicates with its troop using loud calls." },
  ],
  ostrich: [
    { id: 1, text: "The ostrich is the largest bird in the world." },
    { id: 2, text: "An ostrich can run faster than a horse over long distances." },
    { id: 3, text: "We saw the ostrich bury its eggs in the warm sand." },
  ],
  owl: [
    { id: 1, text: "The owl hunted silently through the dark forest." },
    { id: 2, text: "An owl can rotate its head almost all the way around." },
    { id: 3, text: "We heard the owl hoot three times during the night." },
  ],
  squid: [
    { id: 1, text: "The squid swam backward by shooting water from its body." },
    { id: 2, text: "A giant squid can grow longer than a school bus." },
    { id: 3, text: "The squid changed color instantly to blend with the ocean floor." },
  ],
  squirrel: [
    { id: 1, text: "The squirrel gathered acorns and hid them for the winter." },
    { id: 2, text: "A squirrel ran across the telephone wire above our heads." },
    { id: 3, text: "That squirrel has been stealing bird seed from the feeder all week." },
  ],
  tuna: [
    { id: 1, text: "The tuna swam swiftly through the deep ocean waters." },
    { id: 2, text: "Fresh tuna is rich in protein and omega-three fatty acids." },
    { id: 3, text: "The fishermen caught a large tuna near the coast." },
  ],
  wasp: [
    { id: 1, text: "The wasp built its nest under the roof of the shed." },
    { id: 2, text: "A wasp can sting multiple times without dying." },
    { id: 3, text: "We stayed still until the wasp flew away from the picnic table." },
  ],
  whale: [
    { id: 1, text: "The whale surfaced to breathe and sprayed water into the air." },
    { id: 2, text: "A blue whale is the largest animal that has ever lived on Earth." },
    { id: 3, text: "We watched the whale breach completely out of the water." },
  ],

  black: [
    { id: 1, text: "She wore a beautiful black dress to the ceremony." },
    { id: 2, text: "The black cat crossed the street and disappeared into the garden." },
    { id: 3, text: "He painted the wall black to match the modern furniture." },
  ],
  blue: [
    { id: 1, text: "The sky was a brilliant blue without a single cloud." },
    { id: 2, text: "She painted her bedroom a soft shade of blue." },
    { id: 3, text: "The ocean is usually blue because of how water absorbs sunlight." },
  ],
  cream: [
    { id: 1, text: "She added a splash of cream to her morning coffee." },
    { id: 2, text: "The walls were painted a warm cream color." },
    { id: 3, text: "He wore a cream linen suit to the summer wedding." },
  ],
  cyan: [
    { id: 1, text: "The cyan water of the tropical lagoon looked stunning." },
    { id: 2, text: "Cyan is one of the four primary colors used in color printing." },
    { id: 3, text: "The logo uses a bright cyan background with white text." },
  ],
  golden: [
    { id: 1, text: "The sunset painted the sky in shades of golden orange." },
    { id: 2, text: "She received a golden trophy for winning the competition." },
    { id: 3, text: "The puppy had beautiful golden fur that shone in the sunlight." },
  ],
  green: [
    { id: 1, text: "The meadow was covered in fresh green grass." },
    { id: 2, text: "She decided to paint the kitchen a light shade of green." },
    { id: 3, text: "Eating green vegetables is essential for a balanced diet." },
  ],
  grey: [
    { id: 1, text: "The sky turned grey just before the storm began." },
    { id: 2, text: "He wore a grey suit with a crisp white shirt." },
    { id: 3, text: "The building was made of grey stone that looked ancient." },
  ],
  orange: [
    { id: 1, text: "She peeled a fresh orange and offered me a slice." },
    { id: 2, text: "The sunset was a brilliant shade of orange and pink." },
    { id: 3, text: "He wore an orange safety vest while working on the road." },
  ],
  pink: [
    { id: 1, text: "The garden was full of pink roses in full bloom." },
    { id: 2, text: "She decorated the nursery with soft pink wallpaper." },
    { id: 3, text: "The flamingo has bright pink feathers because of its diet." },
  ],
  purple: [
    { id: 1, text: "The lavender fields stretched as far as the eye could see in purple waves." },
    { id: 2, text: "She wore a purple scarf that matched her earrings perfectly." },
    { id: 3, text: "The sky turned a deep purple just after the sun disappeared." },
  ],
  red: [
    { id: 1, text: "She picked a red apple from the tree and took a bite." },
    { id: 2, text: "The red car sped down the highway at full speed." },
    { id: 3, text: "He painted his front door bright red to stand out." },
  ],
  white: [
    { id: 1, text: "The fresh snow was pure white and covered the entire yard." },
    { id: 2, text: "She wore a white dress that flowed gracefully in the wind." },
    { id: 3, text: "The walls of the gallery were painted white to highlight the art." },
  ],
  yellow: [
    { id: 1, text: "The yellow sunflower turned its face toward the morning sun." },
    { id: 2, text: "He wore a yellow raincoat because the forecast predicted rain." },
    { id: 3, text: "The taxi was bright yellow and easy to spot in traffic." },
  ],

  apple: [
    { id: 1, text: "She bit into a crisp red apple and smiled." },
    { id: 2, text: "The apple tree in our backyard produces fruit every autumn." },
    { id: 3, text: "He packed an apple in his lunch bag every morning." },
  ],
  blackberry: [
    { id: 1, text: "We picked fresh blackberries from the bush behind the barn." },
    { id: 2, text: "The blackberry jam she made was sweet and delicious." },
    { id: 3, text: "He added a handful of blackberries to his morning yogurt." },
  ],
  blueberry: [
    { id: 1, text: "She sprinkled fresh blueberries on top of her pancake stack." },
    { id: 2, text: "The blueberry muffins filled the kitchen with a wonderful aroma." },
    { id: 3, text: "Blueberries are packed with antioxidants that support good health." },
  ],
  cherry: [
    { id: 1, text: "The cherry tree in the park bloomed with beautiful pink flowers." },
    { id: 2, text: "She placed a cherry on top of the ice cream sundae." },
    { id: 3, text: "We picked cherries from the orchard until our baskets were full." },
  ],
  grape: [
    { id: 1, text: "She washed a bunch of grapes and placed them in a bowl." },
    { id: 2, text: "The grapes in this vineyard are used to make fine red wine." },
    { id: 3, text: "He ate a few green grapes while waiting for dinner to be ready." },
  ],
  lemon: [
    { id: 1, text: "She squeezed a fresh lemon into her glass of water." },
    { id: 2, text: "The lemon tree in the backyard produces fruit all year round." },
    { id: 3, text: "He added a slice of lemon to his tea for a citrusy twist." },
  ],
  lime: [
    { id: 1, text: "She squeezed a lime over the tacos to add some freshness." },
    { id: 2, text: "The bartender garnished the cocktail with a slice of lime." },
    { id: 3, text: "Lime juice gives the marinade a bright and tangy flavor." },
  ],
  peach: [
    { id: 1, text: "The peach was so ripe that juice ran down her chin." },
    { id: 2, text: "We bought a basket of fresh peaches at the farmer's market." },
    { id: 3, text: "He made a peach cobbler that tasted like summer itself." },
  ],
  pear: [
    { id: 1, text: "She sliced a ripe pear and added it to the cheese platter." },
    { id: 2, text: "The pear tree in the orchard was heavy with golden fruit." },
    { id: 3, text: "He preferred the taste of a pear over an apple for a snack." },
  ],
  pineapple: [
    { id: 1, text: "She cut the pineapple into rings and grilled them for dessert." },
    { id: 2, text: "The pineapple has a rough outer skin and sweet yellow flesh inside." },
    { id: 3, text: "He added chunks of pineapple to the stir fry for a tropical flavor." },
  ],
  raspberry: [
    { id: 1, text: "She picked a raspberry from the bush and popped it into her mouth." },
    { id: 2, text: "The raspberry sorbet was the perfect refreshment on a hot day." },
    { id: 3, text: "He drizzled raspberry sauce over the cheesecake before serving." },
  ],
  strawberry: [
    { id: 1, text: "She dipped a fresh strawberry into melted chocolate." },
    { id: 2, text: "The strawberry fields were full of ripe red fruit ready to harvest." },
    { id: 3, text: "He added sliced strawberries to his bowl of cereal every morning." },
  ],
  watermelon: [
    { id: 1, text: "She carved the watermelon into slices and handed them out at the picnic." },
    { id: 2, text: "The watermelon was cool and refreshing on a scorching summer day." },
    { id: 3, text: "He planted watermelon seeds in early spring and harvested them in August." },
  ],

  eight: [
    { id: 1, text: "There are eight slices of pizza left on the table." },
    { id: 2, text: "She woke up at eight o'clock every morning." },
    { id: 3, text: "An octopus has eight tentacles that it uses to move and hunt." },
  ],
  eighteen: [
    { id: 1, text: "She turned eighteen years old last Saturday." },
    { id: 2, text: "There were eighteen students in the classroom." },
    { id: 3, text: "The store is open from eight in the morning until eighteen hundred hours." },
  ],
  eleven: [
    { id: 1, text: "There are eleven players on a soccer team." },
    { id: 2, text: "She went to bed at eleven o'clock last night." },
    { id: 3, text: "He scored eleven points in the basketball game." },
  ],
  fifteen: [
    { id: 1, text: "She invited fifteen friends to her birthday party." },
    { id: 2, text: "The train departed at fifteen minutes past the hour." },
    { id: 3, text: "He read fifteen pages of the book before falling asleep." },
  ],
  five: [
    { id: 1, text: "She has five fingers on each hand." },
    { id: 2, text: "The meeting will start in five minutes." },
    { id: 3, text: "He scored five goals in the championship match." },
  ],
  four: [
    { id: 1, text: "A square has four equal sides." },
    { id: 2, text: "There are four seasons in a year." },
    { id: 3, text: "She bought four tickets for the concert." },
  ],
  fourteen: [
    { id: 1, text: "The recipe called for fourteen ounces of flour." },
    { id: 2, text: "She turned fourteen and finally got her own room." },
    { id: 3, text: "There were fourteen candles on the birthday cake." },
  ],
  nine: [
    { id: 1, text: "A cat has nine lives, according to the old saying." },
    { id: 2, text: "She went to bed at nine o'clock." },
    { id: 3, text: "He scored nine out of ten on the test." },
  ],
  one: [
    { id: 1, text: "There is only one sun in our solar system." },
    { id: 2, text: "She is the one who always helps everyone." },
    { id: 3, text: "He had one chance to prove himself." },
  ],
  seven: [
    { id: 1, text: "There are seven days in a week." },
    { id: 2, text: "She woke up at seven o'clock every day." },
    { id: 3, text: "He scored seven points in the final quarter." },
  ],
  seventeen: [
    { id: 1, text: "She turned seventeen last spring." },
    { id: 2, text: "There were seventeen books on the shelf." },
    { id: 3, text: "He ran seventeen kilometers during the marathon." },
  ],
  six: [
    { id: 1, text: "A cube has six faces." },
    { id: 2, text: "She bought six apples at the market." },
    { id: 3, text: "The baby is six months old today." },
  ],
  sixteen: [
    { id: 1, text: "She got her driver's license at sixteen." },
    { id: 2, text: "There were sixteen pieces in the puzzle." },
    { id: 3, text: "He saved sixteen dollars from his weekly allowance." },
  ],
  ten: [
    { id: 1, text: "She walked ten blocks to get to the museum." },
    { id: 2, text: "There are ten digits in a phone number." },
    { id: 3, text: "He scored a perfect ten on the assignment." },
  ],
  three: [
    { id: 1, text: "A triangle has three sides." },
    { id: 2, text: "She has three cats at home." },
    { id: 3, text: "He ate three slices of pizza for dinner." },
  ],
  thirteen: [
    { id: 1, text: "She turned thirteen and started middle school." },
    { id: 2, text: "There were thirteen chairs around the table." },
    { id: 3, text: "The number thirteen is often considered unlucky in some cultures." },
  ],
  twelve: [
    { id: 1, text: "There are twelve months in a year." },
    { id: 2, text: "The clock struck twelve at midnight." },
    { id: 3, text: "She bought a dozen eggs, which is twelve eggs." },
  ],
  two: [
    { id: 1, text: "She has two younger brothers." },
    { id: 2, text: "The meeting lasted for two hours." },
    { id: 3, text: "He chose between two options and picked the first one." },
  ],

  bed: [
    { id: 1, text: "She made her bed right after waking up." },
    { id: 2, text: "The cat curled up at the foot of the bed." },
    { id: 3, text: "He jumped into bed after a long day of work." },
  ],
  book: [
    { id: 1, text: "She read a book every week to improve her vocabulary." },
    { id: 2, text: "The book on the shelf has a worn leather cover." },
    { id: 3, text: "He wrote a book about his travels across South America." },
  ],
  car: [
    { id: 1, text: "She drove her car to work every morning." },
    { id: 2, text: "The red car parked in front of the house belongs to my neighbor." },
    { id: 3, text: "He washed his car every Sunday without fail." },
  ],
  chair: [
    { id: 1, text: "She pulled up a chair and sat down at the table." },
    { id: 2, text: "The wooden chair creaked when he leaned back." },
    { id: 3, text: "He pushed his chair in before leaving the room." },
  ],
  clock: [
    { id: 1, text: "The clock on the wall struck midnight." },
    { id: 2, text: "She glanced at the clock and realized she was late." },
    { id: 3, text: "The old grandfather clock has been in the family for generations." },
  ],
  fork: [
    { id: 1, text: "She picked up her fork and started eating the salad." },
    { id: 2, text: "The fork had three tines and a silver handle." },
    { id: 3, text: "He placed the fork on the left side of the plate." },
  ],
  home: [
    { id: 1, text: "She felt a sense of peace when she walked through the door of her home." },
    { id: 2, text: "Home is not just a place, it is a feeling of belonging." },
    { id: 3, text: "He built his home in the middle of the forest." },
  ],
  knife: [
    { id: 1, text: "She used a sharp knife to chop the vegetables." },
    { id: 2, text: "The knife was made of stainless steel with a wooden handle." },
    { id: 3, text: "He carefully wiped the knife clean after cutting the bread." },
  ],
  lamp: [
    { id: 1, text: "She turned on the lamp to read her book before sleeping." },
    { id: 2, text: "The floor lamp cast a warm glow across the entire room." },
    { id: 3, text: "He knocked over the lamp while reaching for his phone." },
  ],
  pants: [
    { id: 1, text: "She bought a new pair of black pants for the interview." },
    { id: 2, text: "He rolled up his pants before wading into the water." },
    { id: 3, text: "These pants are too long and need to be hemmed." },
  ],
  pen: [
    { id: 1, text: "She wrote a letter using a blue ink pen." },
    { id: 2, text: "The pen ran out of ink in the middle of the exam." },
    { id: 3, text: "He clicked the pen open and started taking notes." },
  ],
  pencil: [
    { id: 1, text: "She sharpened her pencil before starting the drawing." },
    { id: 2, text: "The pencil had an eraser on one end and a tip on the other." },
    { id: 3, text: "He sketched the outline with a pencil before adding color." },
  ],
  shirt: [
    { id: 1, text: "She ironed her white shirt before going to work." },
    { id: 2, text: "The shirt had blue stripes and a button down collar." },
    { id: 3, text: "He tucked his shirt into his pants for a cleaner look." },
  ],
  shoes: [
    { id: 1, text: "She tied her shoes before heading out for a run." },
    { id: 2, text: "The shoes were worn out from years of daily use." },
    { id: 3, text: "He polished his leather shoes until they shone." },
  ],
  spoon: [
    { id: 1, text: "She stirred the soup with a large wooden spoon." },
    { id: 2, text: "The baby held the spoon tightly but could not lift it." },
    { id: 3, text: "He used a spoon to scoop the sugar into his coffee." },
  ],
  table: [
    { id: 1, text: "She set the table with plates and glasses for dinner." },
    { id: 2, text: "The wooden table had been in the family for over fifty years." },
    { id: 3, text: "He cleaned the table after everyone finished eating." },
  ],
  tree: [
    { id: 1, text: "The tree in the backyard provided shade during the summer." },
    { id: 2, text: "She climbed the tree to rescue her kitten from a high branch." },
    { id: 3, text: "The old tree had roots that stretched deep into the ground." },
  ],
  window: [
    { id: 1, text: "She opened the window to let in some fresh air." },
    { id: 2, text: "The window looked out onto a quiet garden full of flowers." },
    { id: 3, text: "He cleaned the window until it was spotless and streak free." },
  ],
};

const FALLBACK = [
  { id: 1, text: "This word is used in many different contexts in English." },
  { id: 2, text: "You will encounter this word frequently in everyday conversations." },
  { id: 3, text: "Learning how to use this word correctly will improve your fluency." },
];

export function getExampleSentences(wordObj) {
  if (wordObj?.frases && Array.isArray(wordObj.frases) && wordObj.frases.length > 0) {
    return wordObj.frases.map((f, i) => ({
      id: i + 1,
      en: typeof f === "string" ? f : f?.ing || "",
      es: typeof f === "string" ? "" : f?.esp || "",
    }));
  }
  const key = wordObj?.ing?.toLowerCase().trim();
  const mock = SENTENCE_DB[key] || FALLBACK;
  return mock.map((s) => ({ id: s.id, en: s.text, es: "" }));
}
