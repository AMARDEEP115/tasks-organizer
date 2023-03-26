import React from "react";
import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,useDisclosure,Button,AlertDialogCloseButton,useToast} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

const initialState={
    taskName:"",
    Attribure:[],
}

const AddTaskBox=({dashDisp,setDashDisp,sprintID})=>{
    const [task,setTask]=React.useState(initialState);
    const [load,setLoad]=React.useState(false);
    const cancelRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const AddNewTask=()=>{
        setLoad(true);
        axios.post("https://backend-task-organizer.vercel.app/tasks/addtask",{name:task.taskName,sprintID:sprintID}).then((res)=>{
            let response=res.data;
            if(response.message==="Task is created"){
                toast({
                    title: 'Task Added',
                    description: "New Task Is Created",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                dashDisp=dashDisp.map((el)=>{
                    if(el.sprintID===sprintID){
                        el.tasks.push(task);
                        return el;
                    } else {
                        return el;
                    }
                });
                setDashDisp(dashDisp);
            } else if(response.message==="A task with this name is already present"){
                toast({
                    title: 'Task is alredy present in this sprint',
                    description: "A task with this name is already present in this sprint, try diffrent name",
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
        setTask(initialState);
    }
    return <>
    <button onClick={onOpen}><h1>Tasks</h1> <AiOutlinePlus/></button>
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent w="300px">
        <AlertDialogHeader>Add New Task</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody w="fit-content" margin="auto">
          {!load && <input type="text" value={task.taskName} placeholder="Name of Task" style={{height:"50px",width:"250px",paddingLeft:"2%"}} onChange={(e)=>setTask({...task,taskName:e.target.value})}/>}
          {load && <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef}  colorScheme='red' onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' ml={3} onClick={AddNewTask}>
            Create
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
};

export default AddTaskBox;