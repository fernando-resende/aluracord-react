import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import GitHubUserProfile from '../src/components/UserProfile';
import Copyright from '../src/components/Copyright';
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
                  font-weight: normal !important;
                  padding: 1rem 0;
              }
              `}</style>
        </>
    );
}

export default function Home() {
    const [userName, setUserName] = React.useState('fernando-resende');
    const router = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <Image
                    src='./images/bg/ssbu_fighters_wall.png'
                    styleSheet={{
                        position: 'absolute',
                        maxWidth: 'none',
                        height: '100%',
                        position: 'fixed',
                        zIndex: '-1',
                        left: '-50%'
                    }}
                />

                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        borderRadius: '25px',
                        padding: '1rem',
                        margin: '3rem 1rem 1rem',
                        maxWidth: '400px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: 'rgba(50, 50, 50, 0.7)',
                    }}
                >

                    <Title tag="h3">
                        Join us in {appConfig.name}!
                    </Title>


                    {/* Formulário */}
                    <Box
                        as="form"
                        method="post"
                        styleSheet={{
                            display: 'flex', justifyContent: 'center', flexDirection: 'column',
                            width: { xs: '100%', sm: '80%' }, textAlign: 'center',
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
                            //label='Github user'
                            placeholder='Github user'
                            onChange={event => setUserName(event.target.value)}
                        />


                        <Button
                            type='submit'
                            label='Enter'
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

                    <GitHubUserProfile userName={userName} direction='row' showStatsCard={false} />

                </Box>

                <Copyright />

            </Box>
        </>
    );
}