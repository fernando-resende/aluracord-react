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
            <Box>
                <Image
                    src='./images/bg/ssbu_fighters_wall.png'
                    styleSheet={{
                        display: 'flex',
                        width: '100%',
                    }}
                />
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'cnter',
                        flexDirection: 'column',
                        borderRadius: '25px',
                        padding: '1rem',
                        margin: '1rem',
                        width: '95%',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >

                    <Title tag="h3">
                        Welcome back to the {appConfig.name}!
                    </Title>

                    <GitHubUserProfile userName={userName} direction='row' showStatsCard={false}/>

                    {/* Formulário */}
                    <Box
                        as="form"
                        method="post"
                        styleSheet={{
                            display: 'flex', alignItems: 'start', justifyContent: 'center',
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

                </Box>

                <Copyright />

            </Box>
        </>
    );
}