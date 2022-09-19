import React, {useState, useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {Link, Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import { getPosts, getPostsBySearch } from '../actions/posts';
import {useLocation } from 'react-router-dom';

import useStyles from './styles';

function useQuery()
{
    return new URLSearchParams(useLocation().search);
}

const Paginate = ({page})=>
{
    const dispatch = useDispatch();

    const query = useQuery();

    const search = query.get('searchQuery');

    const tags = query.get('tags');

    const classes = useStyles();

    const {numberOfPages} = useSelector((state)=>state.posts);

    useEffect(()=>
    {
        if(page)
        {
            if(tags || search)
            {
                console.log(search, tags, page);
                dispatch(getPostsBySearch({search, tags, page}));
            }
            else
            {
                dispatch(getPosts(page));
            }
        }
    }, [page]);

    return (
        <Pagination classes={{ul: classes.ul}} count={numberOfPages} page={Number(page)||1} variant='outlined' color="primary" renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={search||tags?`/posts/search?searchQuery=${search}&tags=${tags}&page=${item.page}`:`/posts?page=${item.page}`}/>
        )}/>
    )
}

export default Paginate;
