'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography, Modal, Stack, TextField, Button } from "@mui/material";
import { collection, getDocs, getDoc, setDoc, query, doc, deleteDoc } from "firebase/firestore";

export default function Home() {

  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = []
    docs.forEach(doc => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(), 
      });
    });
    setInventory(inventoryList);
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      const {quantity} = docSnap.data();
      
      if (quantity === 1){
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          quantity: quantity - 1,
        })
      }
    }
    await updateInventory();
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      const {quantity} = docSnap.data();
      await setDoc(docRef, {
        quantity: docSnap.data().quantity + 1,
      })
    } else {
      await setDoc(docRef, {
        quantity: 1,
      })
    }
    await updateInventory();
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    updateInventory();
  }, []);




  return (
  <Box width="100vw" height="100vh" flexDirection="column" display="flex" justifyContent="center" alignItems="center" gap={2}>
    <Modal open={open} onClose={handleClose}>
      <Box position="absolute" top="50%" left="50%" sx={{transform:"translate(-50%, -50%)"}} width={400} bgcolor="white" border="2px solid black" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h6">Add Item</Typography>
        <Stack width="100%" flexDirection="row" gap={2}>
          <TextField variant="outlined" fullWidth value={itemName} onChange={(e) =>{
            setItemName(e.target.value);
          }}></TextField>
          <Button variant="contained" color="primary" onClick={() => {
            addItem(itemName);
            setItemName("");
            handleClose();
          }}>Add</Button>
        </Stack>
      </Box>
    </Modal>
    <Button variant="contained" color="primary" onClick={handleOpen}>Add New Item</Button>
    <Box border="1px solid">
      <Box width="800px" height="100px" display="flex" alignItems="center" bgcolor="#ADD8E6">
          <Typography width="100%" textAlign="center" variant="h2" color="#333">Pantry Tracker</Typography>
      </Box>
    <Stack width="800px" height="300px" gap={2} overflow="auto">
          {
            inventory.map((item, index) => {
              return (
                <Box key={index} width="100%" display="flex" justifyContent="space-between" alignItems="center" p={2}>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.quantity}</Typography>
                  <Button variant="contained" color="primary" onClick={() => {
                    removeItem(item.name);
                  }}>Remove</Button>
                   <Button variant="contained" color="secondary" onClick={() => {
                    addItem(item.name);
                  }}>Add</Button>
                </Box>
                
              )
            })
          }
    </Stack>
    </Box>
  </Box>
  );
}
