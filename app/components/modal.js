import { useState, cloneElement, useEffect } from "react";
import styles from '../css/modal.module.css';
import utilStyles from '../css/util.module.css';

function Modal({ children, modalTrigger }){
    const [show, setShow] = useState(false);
    const visibilityClass = show ? utilStyles.show : utilStyles.hide;

    const content = cloneElement(children, {handleClose:()=>{setShow(false)}})

    useEffect(()=>{
        console.log('modalTrigger', modalTrigger)
        modalTrigger.current.onclick = ()=>{
            console.log('trigger');
            setShow(true)};
    }, [])


    return (
        <div className={`${styles.modalBackground} ${visibilityClass}`} onClick={(e)=>{
            if (e.target === e.currentTarget){
                setShow(false)
            }
            }}>
            {content}
        </div>
    )
};

function ModalTrigger({children}){
    const [modalOn, setModalOn] = useState(false);

    const Trigger = cloneElement(children[1], {onClick:()=>{setModalOn(true)}});
    console.log('Trigger', Trigger)

    return (
        <>
        <Modal show={modalOn} closeModal={()=>{setModalOn(false)}}>{children[0]}</Modal>
        {Trigger}
        </>
    )
}

export { Modal, ModalTrigger }