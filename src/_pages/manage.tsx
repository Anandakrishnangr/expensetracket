import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../_utils/axios';
import { Box, Button, Grid, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

interface Category {
    id: number;
    Name: string;
    Description: string;
    UserID: string;
    TransactionDate: string;
}

const fetchCategories = async (): Promise<Category[]> => {
    const response = await axiosInstance.get('api/categories/');
    return response.data;
};

const deleteCategory = async (id: number): Promise<void> => {
    await axiosInstance.delete(`api/removeCategory/${id}`);
};

const Manage: React.FC = () => {
    const queryClient = useQueryClient();
    const { data: categories, error, isLoading } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const [open, setOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        await deleteCategory(id);
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        setOpen(false);
    };

    const handleOpenDialog = (id: number) => {
        setSelectedCategoryId(id);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleEdit = (id: number) => {
        // Implement your edit logic here
        console.log('Edit category', id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading categories</div>;

    return (
        <>
            <Box sx={{ m: 1, border: '1px solid black' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', padding: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CallMadeIcon color='success' />
                        <Typography sx={{ fontSize: '20px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                             Categories
                        </Typography>
                    </Box>
                    <Button variant='outlined'>
                        <AddIcon /> Create Category
                    </Button>
                </Box>

                <Box sx={{ p: 2 }}>
                    <Grid container sx={{ m: 0, width: '100%' }}>
                        {categories?.map((category) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id} sx={{}}>
                                <Box sx={{ margin: '2px', border: '1px solid black' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                        <Button onClick={() => handleEdit(category.id)}>
                                            <CreateIcon />
                                        </Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                                        {category.Name}
                                    </Box>
                                    <Typography>{category.Description}</Typography>
                                    <Button fullWidth onClick={() => handleOpenDialog(category.id)}>
                                        <DeleteIcon /> Delete
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

         

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this category?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            if (selectedCategoryId !== null) {
                                handleDelete(selectedCategoryId);
                            }
                        }}
                        color="primary"
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Manage;
