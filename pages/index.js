import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function textLengthGreaterThan(text, size) {
    return text.length > size;
}

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-weight: bold;
                  padding: 1rem 0;
              }
              `}</style>
        </>
    );
}

export default function Home() {
    const [userName, setUserName] = React.useState('fernando-resende');
    const router = useRouter();

    var userImage;
    var userImgSrc = '../images/nescontroller.png';

    if (textLengthGreaterThan(userName, 2)) {
        userImgSrc = `https://github.com/${userName}.png`;
    }
    userImage =
        <Image
            styleSheet={{
                borderRadius: '50%',
                position: 'relative',
                top: '5rem',
                height: '10rem',
                border: `5px solid ${appConfig.theme.colors.primary['300']}`,
            }}
            src={userImgSrc}
        />

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(../images/joystick-seamless.jpg)',
                    backgroundRepeat: 'repeat', backgroundSize: '20%', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{ display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    flexDirection: 'column',}}
                >

                    {/* Photo Area */}
                    {userImage}
                    {/* Photo Area */}

                    <Box
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            width: '95%', maxWidth: '700px',
                            borderRadius: '25px', padding: '5rem 1rem 1rem', margin: '16px',
                            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }}
                    >

                        {/* Formulário */}
                        <Box
                            as="form"
                            method="post"
                            styleSheet={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                width: { xs: '100%', sm: '80%' }, textAlign: 'center', marginBottom: '32px',
                            }}
                            onSubmit={event => {
                                event.preventDefault();
                                router.push({
                                    pathname: `/chat`,
                                    query: {
                                        userName: userName
                                    }
                                });
                            }}
                        >
                            <Title tag="h3">Boas vindas de volta ao {appConfig.name}!</Title>

                            <TextField
                                fullWidth
                                textFieldColors={{
                                    neutral: {
                                        textColor: appConfig.theme.colors.neutrals[200],
                                        mainColor: appConfig.theme.colors.neutrals[900],
                                        mainColorHighlight: appConfig.theme.colors.primary[500],
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                    },
                                }}
                                value={userName}
                                onChange={event => setUserName(event.target.value)}
                            />
                            <Button
                                type='submit'
                                label='Entrar'
                                fullWidth
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[700],
                                }}
                                styleSheet={{
                                    fontFamily: "'Press Start 2P', cursive !important",
                                }}
                            />
                        </Box>
                        {/* Formulário */}

                    </Box>

                </Box>
            </Box>
        </>
    );
}