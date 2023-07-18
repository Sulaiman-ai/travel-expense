import { useState } from "react";

export default function Editable ({editing=false, display, input}){
    // const [editing, setEditing] = useState(false);

    return (
        <>
        {editing ? input : display}
        </>
    )
}