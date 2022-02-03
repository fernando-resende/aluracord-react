import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { supabase } from '../src/util/supabaseClient';
import ChannelList from '../src/components/ChannelList';
import Copyright from '../src/components/Copyright';
import { StickerButton } from '../src/components/StickerButton';
import { useRouter } from 'next/router';

export default function ChatPage() {
    const userName = useRouter().query.userName;
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    console.log(appConfig['ssbu-complete'].filter(e=>e.series.name==='Final Fantasy'));

    React.useEffect(() => {
        fetchMessages();
        listenRealTimeMessages((newMessage) => {
            setMessageList((currentListValue) => {
                return [
                    newMessage,
                    ...currentListValue
                ]
            })
        });
    }, []);

    async function fetchMessages() {
        const { data } = await supabase
            .from('messages')
            .select('*')
            .order('id', { ascending: false });
        setMessageList(data);
    }

    function listenRealTimeMessages(setLiveMessage) {
        supabase
            .from('messages')
            .on('INSERT', (live) => {
                setLiveMessage(live.new);
            })
            .subscribe();
    }

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */

    function handleNewMessage(user, newMessage) {
        let message = {
            from: user,
            message: newMessage,
        };
        supabase
            .from('messages')
            .insert(message)
            .then(() => {
                setMessage('');
            });
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                color: appConfig.theme.colors.neutrals['000'],
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '1rem',
                }}
            >

                <Header user={userName} />

                <Box styleSheet={{ display: 'flex',
                            height: '90%', }}>
                    <ChannelList styleSheet={{ display: 'flex' }} />

                    <Box
                        styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            flex: 1,
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            flexDirection: 'column',
                            borderRadius: '5px',
                            padding: '16px',
                            backgroundImage: `url(${appConfig.ssbu.series[0].icon})`,
                            backgroundRepeat: 'no-repeat', backgroundSize: '50%', 
                            backgroundBlendMode: 'multiply', backgroundPosition: 'center'
                        }}
                    >
                        <MessageList messages={messageList} user={userName} />

                        <Box
                            as="form"
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                borderRadius: '5px',
                                padding: '5px'
                            }}
                        >
                            <TextField
                                value={message}
                                onChange={(event) => {
                                    const valor = event.target.value;
                                    setMessage(valor);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        handleNewMessage(userName, message);
                                    }
                                }}
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '5px',
                                    marginRight: '5px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            />

                            <StickerButton
                                onStickerClick={(sticker) => {
                                    handleNewMessage(userName, `sticker->${sticker}`);
                                }}
                            />

                            <Button
                                label=''
                                iconName='arrowRight'
                                title='Enviar'
                                onClick={(event) => {
                                    handleNewMessage(userName, message);
                                    console.log(document.getElementsByTagName('textarea')[0].focus());
                                }}
                                styleSheet={{
                                    borderRadius: '50%',
                                    padding: '0 3px 0 0',
                                    marginLeft: '5px',
                                    minWidth: '50px',
                                    minHeight: '50px',
                                    fontSize: '20px',
                                    lineHeight: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: appConfig.theme.colors.neutrals[300],
                                    hover: {
                                        filter: 'grayscale(0)',
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

            <Copyright />
            
            </Box>
        </Box>
    )
}

function Header(props) {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Box styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'start'
                }} >
                    <Image
                        styleSheet={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${props.user}.png`}
                    />
                    <Text>{props.user}</Text>
                </Box>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        className={message.from === props.user ? 'my-message' : 'other-message'}
                        styleSheet={{
                            borderRadius: '10px',
                            padding: '10px',
                            marginBottom: '12px',
                            fontSize: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            },

                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex', alignItems: 'center',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Box>
                                <Text tag="strong" styleSheet={{
                                    fontSize: '10px',
                                    color: appConfig.theme.colors.primary[100]
                                }}>
                                    {message.from}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {new Date(message.created_at).toLocaleString()}
                                </Text>
                            </Box>
                        </Box>
                        {
                            message.message != undefined ? (
                                message.message.startsWith('sticker->')
                                    ? (
                                        <Image
                                            src={message.message.replace('sticker->', '')}
                                            styleSheet={{
                                                maxHeight: '128px',
                                            }}
                                        />
                                    )
                                    : (
                                        message.message
                                    )
                            ) : ('')
                        }
                    </Text>
                );
            })}
        </Box>
    )
}