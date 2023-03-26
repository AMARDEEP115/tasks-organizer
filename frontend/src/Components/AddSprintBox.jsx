import React from "react";
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,useDisclosure,Button,AlertDialogCloseButton,useToast} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react'
import axios from "axios";

const initialState={
    sprintName:"",
    tasks:[],
}

const AddSprintBox=({dashDisp,setDashDisp})=>{
    const [sprint,setSprint]=React.useState(initialState);
    const [load,setLoad]=React.useState(false);
    const cancelRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const AddNewSprint=()=>{
        setLoad(true);
        axios.post("https://backend-task-organizer.vercel.app/sprints/addsprint",{name:sprint.sprintName}).then((res)=>{
            let response=res.data;
            if(response.message==="A new sprint is added"){
                toast({
                    title: 'Sprint Added',
                    description: "New Sprint Is Created",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                dashDisp=[...dashDisp,sprint];
                setDashDisp(dashDisp);
            } else if(response.message==="A sprint with this name is already present"){
                toast({
                    title: 'Sprint is alredy present',
                    description: "A sprint with this name is already present, try diffrent name",
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
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
        setSprint(initialState);
    }
    return <>
    <button  id="AddNewSprint" onClick={onOpen}>Add New Sprint</button>
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent w="300px">
        <AlertDialogHeader>Add A New Sprint</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody w="fit-content" margin="auto">
          {!load && <input type="text" value={sprint.sprintName} placeholder="Name of Sprint" style={{height:"50px",width:"250px",paddingLeft:"2%"}} onChange={(e)=>setSprint({...sprint,sprintName:e.target.value})}/>}
          {load && <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef}  colorScheme='red' onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' ml={3} onClick={AddNewSprint}>
            Create
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
};

export default AddSprintBox;