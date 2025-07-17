import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useCategories } from '../hooks/useCategories';

const CategoriesPage = () => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Categories</Typography>
      <List>
        {categories?.map((category) => (
          <ListItem key={category._id}>
            <ListItemText 
              primary={category.name} 
              secondary={category.description} 
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CategoriesPage;