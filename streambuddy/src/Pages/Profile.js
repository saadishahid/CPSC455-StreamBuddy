import React from 'react';
import CommentInput from '../components/CommentInput';
import {Container} from "@material-ui/core";
import Authentication from "../components/Authentications";


function Profile() {

    return(
        <Container maxWidth="lg">
            <div>
                <h1> User profile </h1>
                <CommentInput/>
            </div>
        </Container>
    );
}

export default Profile;