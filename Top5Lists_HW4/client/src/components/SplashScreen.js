import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

export default function SplashScreen() {
    return (
        <div id="splash-screen" style={{fontWeight: "bold"}} >
            The Top 5 Lister
            <Link to='/login/'>
                <Button 
                    style ={{
                    textTransform: "none",
                    radius: ".5",
                    position: "absolute",
                    left: "20%",
                    top: "60%",
                    textAlign: "center",
                    fontSize: "2vw",
                    color: "black",
                    backgroundColor:"rgb(255,128,128)"}}
                    >
                    Log In
                </Button>
            </Link>
            <Link to='/register/'>
                <Button 
                    style ={{
                    textTransform: "none",
                    radius: ".5",
                    position: "absolute",
                    left: "40%",
                    top: "60%",
                    textAlign: "center",
                    fontSize: "2vw",
                    color: "black",
                    backgroundColor:"rgb(211,167,194)"}}
                    >
                    Register
                </Button>
            </Link>
            <Button 
                style ={{
                textTransform: "none",
                radius: ".5",
                position: "absolute",
                left: "62%",
                top: "60%",
                textAlign: "center",
                fontSize: "2vw",
                color: "black",
                backgroundColor:"rgb(164,153,225)"}}
                >
                Continue as Guest
            </Button>
            <div
                style ={{
                radius: ".5",
                position: "absolute",
                left: "5%",
                top: "86%",
                textAlign: "center",
                fontSize: "1.5vw"}}>
                An App by Nelson Zheng
                </div>
            <div
                style ={{
                radius: ".5",
                position: "absolute",
                left: "35%",
                top: "30%",
                textAlign: "center",
                fontSize: "1.5vw"}}>
                Your Favorite List Sharing App
                </div>
        </div>
    )
}