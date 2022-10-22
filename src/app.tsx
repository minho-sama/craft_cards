import * as React from "react"
import * as ReactDOM from 'react-dom'
import craftXIconSrc from "./craftx-icon.png"
import Card from "./components/Card/Card"
import QuickCreate from "./components/QuickCreate"
import MyCollections from "./components/MyCollections"
import Modal from "./components/Modal"


const App: React.FC<{}> = () => {
  const isDarkMode = useCraftDarkMode();

  const [toggleBlocks, setToggleblocks]:any = React.useState()
  const [initialBlocksLength, setInitialBlocksLength]:any = React.useState()

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

  }, [isDarkMode]);

  React.useEffect(() => {
    insertToggleBlocksForDev()
  }, [])

  async function insertToggleBlocksForDev() {  //for development only
  
    const text1 = craft.blockFactory.textBlock({
      content: "craft card1",
      listStyle: { type: "toggle" },
    });

    const text1subblock = craft.blockFactory.textBlock({
      content: "back of card1",
      indentationLevel: 1
    })

    const text2 = craft.blockFactory.textBlock({
      content: "craft card 2",
      listStyle: { type: "toggle" },
    });

    const text3 = craft.blockFactory.textBlock({
      content: "craft card 3",
      listStyle: { type: "toggle" }
    });

    const text4 = craft.blockFactory.textBlock({
      content: "craft card 4",
      listStyle: { type: "toggle" }
    });
  
    craft.dataApi.addBlocks([text1, text1subblock, text2, text3, text4]);
  
  }

  function shuffleCards (blocks:any){
    for (let i = 0; i < blocks.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]]
    }
    return blocks
  }

  function reArrangeCard(){
    const blocksCopy = JSON.parse(JSON.stringify(toggleBlocks))
    const insertAt = Math.floor(Math.random() * blocksCopy.length)
    const blockToInsert = blocksCopy.shift()
    setToggleblocks([...blocksCopy.slice(0, insertAt), blockToInsert, ...blocksCopy.slice(insertAt)])
  }

  //pass down to Card component?
  function filterCompletedCard(cardId: string){
    //NÉZNI BEST PRACTICET
    //először DEEP COPY? vagy lehet egyből így: setToggleBlocks(toggleBlocks => toggleBlocks.filter(block => block.id !== cardId))
    //és muszáj ez a helper function, nem egyszerűbb leproppolni Card.js-nek és onnan direktben?
    //https://stackoverflow.com/questions/60230221/how-can-i-update-this-state-without-mutating-the-array

    setToggleblocks((toggleBlocks:any) => toggleBlocks.filter((block:any) => block.id !== cardId))

    //   const copyToggleBlocks = JSON.parse(JSON.stringify(toggleBlocks))
    // setToggleblocks(copyToggleBlocks.filter((block:any) => block.id !== cardId))
    console.log(toggleBlocks)
  }

  //tabok: saved colletions -> learning felület; create collection ez sheet containerben lesz
  return <div id = "main-column">
    <div className = "header main">
      <img className="icon" src={craftXIconSrc} alt="CraftX logo" />
      {/* <QuickCreate 
        setToggleblocks  = {setToggleblocks}
        setInitialBlocksLength = {setInitialBlocksLength} 
        shuffleCards = {shuffleCards}>
      </QuickCreate> */}
      <MyCollections>

      </MyCollections>
      {/* <CreateCollection>

      </CreateCollection> */}
    </div>

    {
      toggleBlocks?.length > 0 &&
      <div className = "header info">
        <span>uncompleted: {toggleBlocks.length}</span>
        <span>completed: {initialBlocksLength - toggleBlocks.length}</span>
      </div>
    }

    {/*card-containert külön componentbe és csak akkor renderelni ha kell!*/}
    <div id = "card-container">
      {
        toggleBlocks?.length > 0 ? 
        <>
        { /*majd megcsinálni, hogy csak 1-et rendereljen ki! a maradék csak üres div! performance optimization */
          toggleBlocks.slice(0,4).map((block:any, i:number) => {
            console.log("card rendered")
            return <Card key = {block.id} block = {block} reArrangeCard = {reArrangeCard} filterCompletedCard = {filterCompletedCard} index = {i}></Card>
          })
        }
        </> 
        :
        <div>info about this extension bla bla</div>
      }
    </div>

    <Modal></Modal>

  </div>;
}

function useCraftDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    craft.env.setListener(env => setIsDarkMode(env.colorScheme === "dark"));
  }, []);

  return isDarkMode;
}

export function initApp(): void {
  ReactDOM.render(<App />, document.getElementById('react-root'))
}
