


import { useState, useEffect } from 'react';
import { ethers, BigNumber} from 'ethers';
import ThugCity from './TheOnlyFansNFT.json'
import { Box, Button, Flex, Input, Text, Image } from '@chakra-ui/react';
import Thug from './assets/background/thug.png';
const ThugCityAddress = "0xf7cD2Ec586D3e81EdE7Ef235e356b31Ec648d790";


const MainMint =  ({ accounts, setAccounts }) =>  {
    const [mintAmount, setMintAmount] = useState(1);
    const [publicEnabled, publicSale] = useState(false);

    const [publicSupply, getPublicSupply] = useState(0);
    const isConnected = Boolean(accounts[0]);

    useEffect(() => {
        getPublicValue()
    }, [accounts, isConnected])
     

    async function handleMint() {



        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                ThugCityAddress,
                ThugCity,
                signer
            );
            try {

                const price = await contract.checkCost(mintAmount);
                        const response = await contract.mint(BigNumber.from(mintAmount), { 
                            value: BigNumber.from((price).toString()),
                            gasLimit: "200000"
                        });
    
                        console.log('response: ', response)
    
                
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }


    const handleDecrement = () => {
        if (mintAmount === 3) {
            setMintAmount(1);
        }
        if (mintAmount === 5) {
            setMintAmount(3);
        }
    }

    const handleIncrement = () => {
        if (mintAmount === 1) {
            setMintAmount(3);
        }
        if (mintAmount === 3) {
            setMintAmount(5);
        }
    }

    async function getPublicValue() {
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            ThugCityAddress,
            ThugCity.abi,
            signer
        );

        getPublicSupply(parseInt(await contract.totalSupply(), 10))
    }  

    
    function getDiv() {
            return ( <div>
                <Flex align="center" justify="center">
                    <Button 
                    backgroundColor="#8b0000"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="10px"
                    marginTop="10px"
                    onClick={handleDecrement}>-</Button>
                    <Input  
                    readOnly
                    width="100px"
                    height="40px"
                    textAlign="center"
                    fontFamily="inherit"
                    paddingLeft="19px"
                    marginTop="10px"
                    type="number" 
                    value={mintAmount} />
                    <Button 
                    backgroundColor="#8b0000"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="10px"
                    marginTop="10px"
                    onClick={handleIncrement}>+</Button>
                </Flex>
                <Button 
                    backgroundColor="#000000"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #000000"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="10px"
                    marginTop="10px"
                    onClick={handleMint}>Mint Now</Button>
            </div>)
    }


    return (
        <Flex justify="center" align="center" height="125vh" paddingBottom="110px">
            <Box width="520px">

                <div>
                    <Image 
                    src={Thug} 
                    boxSize="0px" 
                    margin="0 15px"
                    boxShadow="0px 0px 0px 0px #8b0000"
                    borderRadius="10px"

                    />
                    <Text 
                    fontSize="18px" 
                    letterSpacing="-5.5%"
                    fontFamily="inherit"
                    textShadow="0 0px 0px #8b0000"
                    
                    >                    {publicSupply} / 6969 remain <br/><br/> 1 = FREE <br/> OR <br/>  more than 1 = 0.002 ETH
                    </Text>
                </div>

                {isConnected ? 

                    
                    getDiv()
                 : (
                    <Text 
                    margin Top="70px"
                    fontSize="25px" 
                    fontWeight="bold"
                    letterSpacing="-5.5%"
                    fontFamily="inherit"
                    textShadow="0 0px #8b0000"

                    >You must be connected to mint.
                    </Text>
                )}


            </Box>
            
        
        </Flex>
    )

}


export default MainMint;