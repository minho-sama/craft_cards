import React = require("react")
import "./Modal.css"


const Modal = (props: any) => {
    
    const [isModalOpen, setIsModalOpen]:any = React.useState(false)
    const [selectedBlocks, setSelectedBlocks]:any = React.useState()

    React.useEffect(() => {
        console.log(selectedBlocks)
    }, [selectedBlocks])

    const addSelectionToPreview = async () => {

        //ez így működik, csak devben szar
        // const result = await craft.editorApi.getSelection()
        // if (result.status !== "success") {
        //     throw new Error(result.message)
        // }
        // const selectedBlocks = result.data;

        // const selectedBlocksInPairs:any = []
        // for(let i = 0; i < selectedBlocks.length; i+=2){
        //     if(selectedBlocks[i + 1] !== undefined){
        //         selectedBlocksInPairs.push({
        //             front: selectedBlocks[i],
        //             back: selectedBlocks[i+1]
        //         })
        //     }
        // }
        //ez így működik, csak devben szar

        //dev
        const result = await craft.dataApi.getCurrentPage();
        if (result.status !== "success") throw new Error(result.error);
        const pageBlock = result.data;

        const mockData = pageBlock.subblocks.slice(0,5)

        const selectedBlocksInPairs:any = []
        for(let i = 0; i < mockData.length; i+=2){
            if(mockData[i + 1] !== undefined){
                selectedBlocksInPairs.push({
                    front: mockData[i],
                    back: mockData[i+1]
                })
            }
        }
        //dev

        setSelectedBlocks(selectedBlocksInPairs)
    }
        
    return (
        <div className = {"modal " + (isModalOpen ? "open" : "closed")}>
            <div className="wrapper">
                <button className = "modal-button" onClick = {() => setIsModalOpen( (isModalOpen: boolean) => !isModalOpen)} >
                    {isModalOpen ? "": "Create Collection"}
                </button>

                <button className = "selection-to-preview-btn" onClick = {addSelectionToPreview}>
                    selection to preview
                </button>

                <div className="preview-card-container">
                    {
                        selectedBlocks?.length > 0 &&
                        selectedBlocks.map((selectedBlock:any) => {
                            return <PreviewCard 
                                key = {selectedBlock.front.id} 
                                selectedBlock = {selectedBlock}
                            >   
                            </PreviewCard>
                        })
                    }
                </div>
            </div>
        </div>

    )
}

const PreviewCard = (props: any) => {
    const {selectedBlock} = props

    const [frontValue, setFrontValue] = React.useState()
    const [backValue, setBackValue] = React.useState()

    // const tx = document.getElementsByTagName("textarea");
    // for (let i = 0; i < tx.length; i++) {
    // tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    // tx[i].addEventListener("input", OnInput, false);
    // }

    // function OnInput() {
    // this.style.height = 0;
    // this.style.height = (this.scrollHeight) + "px";
    // }

    // React.useEffect(() => {
    //     const tx = document.getElementsByTagName("textarea");
    //     for (let i = 0; i < tx.length; i++) {
    //         console.log(tx[i].scrollHeight)
    //         tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    //         // tx[i].setAttribute("style", "height:auto;overflow-y:hidden;");
    //     }
    // }, [])

    function autoResizeTextBox(e: any, isFront: boolean){
        e.target.style.height = 0;
        e.target.style.height = (e.target.scrollHeight) + "px";

        if(isFront){
            setFrontValue(e.target.value)
        } else{
            setBackValue(e.target.value)
        }
    }

    return (
        <div className="preview-card">
            <div className="front">
                <textarea 
                    onChange = {(e) => autoResizeTextBox(e, true)} 
                    defaultValue = {selectedBlock.front.content[0]?.text} 
                    value = {frontValue}>
                </textarea>
            </div>
            <div className="back">
                <textarea 
                        onChange = {(e) => autoResizeTextBox(e, false)} 
                        defaultValue = {selectedBlock.back.content[0]?.text} 
                        value = {backValue}>
                </textarea>
            </div>
        </div>
    )
}

export default Modal