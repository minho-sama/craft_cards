import * as React from "react"
import * as ReactDOM from 'react-dom'
import craftXIconSrc from "./craftx-icon.png"
import Card from "./components/Card/Card"

const App: React.FC<{}> = () => {
  const isDarkMode = useCraftDarkMode();

  const [toggleBlocks, setToggleblocks]:any = React.useState()
  const [completedCount, setCompletedCount]:any = React.useState(0)

  React.useEffect( () => {
    console.log(toggleBlocks)
  }, [toggleBlocks])

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

    const text1subblock = craft.blockFactory.textBlock({
      content: "craft card1 back"
    })
  
    const text1 = craft.blockFactory.textBlock({
      content: "craft card1",
      listStyle: { type: "toggle" },
      subblocks: [text1subblock]
    });

    const text2 = craft.blockFactory.textBlock({
      content: "craft card 2",
      listStyle: { type: "toggle" }
    });

    const text3 = craft.blockFactory.textBlock({
      content: "craft card 3",
      listStyle: { type: "toggle" }
    });

    const text4 = craft.blockFactory.textBlock({
      content: "craft card 4",
      listStyle: { type: "toggle" }
    });
  
    craft.dataApi.addBlocks([text1, text2, text3, text4]);
  
  }

  async function collectToggleCards(){

    //getCurrentPage dolgot kiszervezni custom hookba?
    const result = await craft.dataApi.getCurrentPage();
    if (result.status !== "success") {
        // Handle error!!!
        throw new Error(result.error);
    }
    const pageBlock = result.data;
    
    const toggleBlocks = pageBlock.subblocks.filter((block) => {  //only first level blocks
      return block.listStyle.type === "toggle"
    })

    const shuffledToggleBlocks = shuffleCards(toggleBlocks)

    setToggleblocks(shuffledToggleBlocks)
  }

  function shuffleCards (blocks:any){
    for (let i = 0; i < blocks.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = blocks[i];
        blocks[i] = blocks[j];
        blocks[j] = temp;
        //átírni szebbre es6!!!
    }
    return blocks
  }

  function filterCompletedCard(cardId: string){
    //NÉZNI BEST PRACTICET
    //filter rosszabb performance-ban mint pl a slice? 
    //először deep copy? vagy lehet egyből így: setToggleBlocks(toggleBlocks => toggleBlocks.filter(block => block.id !== cardId))
    //és muszáj ez a helper function, nem egyszerűbb leproppolni Card.js-nek és onnan direktben?

    setToggleblocks((toggleBlocks:any) => toggleBlocks.filter((block:any) => block.id !== cardId))

    //   const copyToggleBlocks = JSON.parse(JSON.stringify(toggleBlocks))
    // setToggleblocks(copyToggleBlocks.filter((block:any) => block.id !== cardId))
    console.log(toggleBlocks)
  }

  return <div id = "main-column">
    <div className = "header main">
      <img className="icon" src={craftXIconSrc} alt="CraftX logo" />
      <button className={`btn ${isDarkMode ? "dark" : ""}`} onClick={collectToggleCards}>
        create cards
      </button>
    </div>
    {
      toggleBlocks?.length > 0 &&
      <div className = "header info">
        <span>uncompleted: {toggleBlocks.length}</span>
        <span>completed: {completedCount}</span>
      </div>
    }
    <div id = "card-container">
      {
        toggleBlocks?.length > 0 ? 
        <>
        {
          toggleBlocks.map((block:any, i:number) => {
            console.log("card rendered")
            return <Card key = {block.id} block = {block} setCompletedCount = {setCompletedCount} filterCompletedCard = {filterCompletedCard} index = {i}></Card>
          })
        }
        </> 
        :
        <div>info about this extension bla bla</div>
      }
    </div>
  </div>;
}

function useCraftDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    craft.env.setListener(env => setIsDarkMode(env.colorScheme === "dark"));
  }, []);

  return isDarkMode;
}

export function initApp() {
  ReactDOM.render(<App />, document.getElementById('react-root'))
}
