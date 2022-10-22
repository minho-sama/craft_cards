import React = require("react")

const QuickCreate = (props:any) => {

    const {shuffleCards, setToggleblocks, setInitialBlocksLength} = props

    console.log(props)

    const handleQuickCreateClick = () => {
        //set mode to quickCreate
        collectToggleCards()
    }

    async function collectToggleCards(){

        //getCurrentPage dolgot kiszervezni custom hookba?
        const result = await craft.dataApi.getCurrentPage();
        if (result.status !== "success") {
            // Handle error!!!!!!
            throw new Error(result.error);
        }
        const pageBlock = result.data;
        
        const toggleBlocks = pageBlock.subblocks.filter((block) => {  //only first level blocks
          return block.listStyle.type === "toggle"
        })
    
        const shuffledToggleBlocks = shuffleCards(toggleBlocks)

        console.log(props)
    
        setToggleblocks(shuffledToggleBlocks)
        setInitialBlocksLength(shuffledToggleBlocks.length)
      }

    return <button className="btn" onClick = {handleQuickCreateClick}>
        Quick Create
    </button>
}

export default QuickCreate