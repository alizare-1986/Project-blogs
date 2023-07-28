import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_BLOG_INFO } from '../graphql/queries';
import Loader from '../shared/Loader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, Container,Grid, Typography } from '@mui/material';
import sanitize from 'sanitize-html';
import CommentForm from '../comment/CommentForm';
import Comments from '../comment/Comments';

const BlogPages = () => {
    const {slug} =useParams()
    const navigate = useNavigate()
    const {loading,data,error} = useQuery(GET_BLOG_INFO,{
        variables:{slug}
    })
    if(loading) return <Loader/>
    if(error) return <h4>is error ...  </h4>
   
    return (
        <Container maxWidth='lg'>
            <Grid container>
                <Grid item xs={12} mt={9} display='flex' justifyContent='space-between'>
                    <Typography component='h2' variant='h4' color='primary' fontWeight={700}>
                        {data.post.title}
                    </Typography>
                    <ArrowBackIcon onClick={()=> navigate(-1)}/>

                </Grid>
                <Grid item xs={12} mt={6} > 
                <img src={data.post.coverPhoto.url} alt={data.post.slug} width='100%' style={{borderRadius:'20px'}}/>

                </Grid>
                <Grid item xs={12} mt={7} display='flex' alignItems='center' >
                 <Avatar src={data.post.author.avatar.url} sx={{width:80, height:80 , marginLeft:4}} />
                 <Box component='div'>
                 <Typography component='p' variant='h5' fontWeight={700}> {data.post.author.name} </Typography>
                 <Typography component='p' variant='p' color='text.secondary'> {data.post.author.field} </Typography>
                 </Box>
                </Grid>
                <Grid item xs={12} mt={5}>
                    <div dangerouslySetInnerHTML={{__html: sanitize(data.post.content.html)}}></div>
                </Grid>
                <Grid item xs={12}>
                    <CommentForm slug={slug}/>
                </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Comments slug={slug}/>
                </Grid>
           
        </Container>
    );
};

export default BlogPages;