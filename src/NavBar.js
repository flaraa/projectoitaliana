import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Twitter from './assets/social-media-icons/twitter_32x32.png';
import logo from './assets/background/thug.png';




const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="20px">
            { /* Left side - Social Media Icons */ }
            <Flex justify="space-around" width="7%" padding="0 10px">
                <Link href="onlyfansnft.fun">
                    <Image src={logo} boxSize="100px" margin="0 15px"/>
                </Link>

            </Flex>
            <Flex justify="space-around" width="1%" padding="0 1px">
                <Link href="https://twitter.com/TheOnlyFansNFT">
                    <Image src={Twitter} boxSize="50px" margin="0 50px"/>
                </Link>
                <Spacer/>

            </Flex>

            {/* Right side - Sections and Connect */}


            <Flex
            justify="space-between" 
            align="center"
            width="100%"
            padding="30px"
            >
                <Spacer/>
               

            </Flex>

            {/* Connect */}
            {isConnected ? (
                <Box margin="0 120px">Connected</Box>
            ) : (
                <Button 
                backgroundColor="#000000"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                margin="0 100px"
                onClick={connectAccount}
                >
                Connect
                </Button>
                // <button onClick={connectAccount}>Connect</button>
            )}
        </Flex>
    )
}

export default NavBar;
