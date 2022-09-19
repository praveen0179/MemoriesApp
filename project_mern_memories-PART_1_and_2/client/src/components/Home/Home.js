import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import {Grow, Container, Grid, Paper, AppBar, TextField, Button} from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getPosts, getPostsBySearch} from '../../actions/posts';
import useStyles from './styles';
import Pagination from '../pagination2';
import {useNavigate, useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

function useQuery()
{
    return new URLSearchParams(useLocation().search);
}

const Home = ()=>
{
    const Navigate = useNavigate();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page')||1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch]);

    const handleKeyPress = (e)=>
    {
        if(e.keyCode==13)
        {
            searchPost();
        }
    }

    const handleAdd = (tag)=>
    {
        setTags([...tags, tag]);
    }

    const handleDelete = (tag)=>
    {
        setTags(tags.filter((tagg)=>tagg!=tag));
    }

    const searchPost = ()=>
    {
        if(search.trim()||tags)
        {
            dispatch(getPostsBySearch({search, tags: tags.join(','), page}));
            Navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}&page=${page}`);
        }
        else
        {
            Navigate('/posts');
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField name="search" variant="outlined" label="search Memories" onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e)=>{setSearch(e.target.value)}}></TextField>
                        <ChipInput
                            style={{margin: '10px 0'}}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label="Search tags"
                            variant="outlined"
                        />
                        <Button onClick={searchPost} variant="outlined" className={classes.searchButton}
                        color="primary">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <Paper elevation={6}>
                        <Pagination page={page}/>
                    </Paper>
                </Grid>
            </Grid>
            </Container>
        </Grow>
    )
}

export default Home;