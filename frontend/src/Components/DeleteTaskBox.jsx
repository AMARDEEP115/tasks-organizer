import React from "react";
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,useDisclosure,Button,AlertDialogCloseButton,useToast} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { MdOutlineDeleteForever } from "react-icons/md";
import axios from "axios";

const DeleteTaskBox=({dashDisp,setDashDisp,sprintID,taskID})=>{
    const [load,setLoad]=React.useState(false);
    const cancelRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const DeleteTask=()=>{
        setLoad(true);
        axios.delete(`https://backend-task-organizer.vercel.app/tasks/removetask/${taskID}`).then((res)=>{
            let response=res.data;
            if(response.message==="Task is deleted"){
                toast({
                    title: 'Task deleted',
                    description: "Task is deleted",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                dashDisp=dashDisp.map((el)=>{
                    if(el.sprintID===sprintID){
                        el.tasks=el.tasks.filter((ele)=>ele.taskID!==taskID);
                        return el;
                    } else {
                        return el;
                    }
                });
                setDashDisp(dashDisp);
            } else {
                toast({
                    title: 'Error',
                    description: "Something went wrong, Try again",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            }
            setLoad(false);
            onClose();
        }).catch(err=>{
            toast({
                title: 'Error',
                description: "Something went wrong, Try again",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            setLoad(false);
            onClose();
        });
    }
    return <>
    <button onClick={onOpen}><MdOutlineDeleteForever color="black" size="20px"/></button>
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent w="300px">
        <AlertDialogHeader>Delete Task</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody w="fit-content" margin="auto">
          {!load && "Are you sure you want to delete this Task?"}
          {load && <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef}  colorScheme='blue' onClick={onClose}>
            No
          </Button>
          <Button colorScheme='red' ml={3} onClick={DeleteTask}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
};

export default DeleteTaskBox;