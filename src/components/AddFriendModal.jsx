import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalBody, ModalCloseButton, Heading} from "@chakra-ui/react";
import TextField from './TextField'
import { Formik, Form } from "formik";
import getSocketInstance from ".././socket";
import { useCallback, useContext, useState } from "react";
import { FriendContext} from "./Friends";
const AddFriendModal= ({isOpen, onClose})=>{
    const [error, setError]= useState("");
    const {setFriendList}= useContext(FriendContext);
    const socket= getSocketInstance();
    const closeModal = useCallback(()=>{
         setError("");
         onClose();
    }, [onClose])
    return (
        // onclicking the background the the popup disappears
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />   
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik
         initialValues={{friendName:""}}
         onSubmit={values => {
            socket.emit("add_friend", values.friendName, ({errorMsg, done, newFriend})=>{
                if(done){
                    setFriendList(prev => [newFriend, ...prev] );
                    setMessage(prev => [...prev]);
                    closeModal();
                    return;
                }
                setError(errorMsg);
            })
         }}
        >
        <Form>
            <Heading as ="p" color= "red.500" textAlign="center" fontSize="x-large">{error}</Heading>
        <ModalBody>
            <TextField
            label="Friend's name"
            placehoder= "Enter friend's username.."
            autoComplete= "off"
            name= "friendName" 
            />
          
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue'  type="submit">
                Submit
            </Button>
        </ModalFooter>
        </Form>
        </Formik>
      </ModalContent>
    </Modal>
    );

}
export default AddFriendModal;