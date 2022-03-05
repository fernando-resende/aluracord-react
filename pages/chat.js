import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { supabase } from '../src/util/supabaseClient';
import { Box, Text, TextField, Icon, Image, Button } from '@skynexui/components';
import { StickerButton } from '../src/components/StickerButton';
import GitHubUserProfile from '../src/components/UserProfile';
import Channels from '../src/components/ChannelList';
import Copyright from '../src/components/Copyright';

const SSB_GENERAL = 'Super Smash Bros.';

export default function ChatPage() {
    const userName = useRouter().query.userName;
    const [channel, setChannel] = React.useState(SSB_GENERAL);
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    React.useEffect(() => {
        fetchMessages(channel);
        listenRealTimeMessages((newMessage) => {
            console.log("Current Channel: " + channel);
            console.log("New Message Channel: " + newMessage.channel);
            if (newMessage.channel === channel) {
                console.log("In channel that received some message...");
                setMessageList((currentListValue) => {
                    return [
                        newMessage,
                        ...currentListValue
                    ];

                });
            }
        });
    }, [channel]);

    async function fetchMessages(selectedChannel) {
        const { data } = await supabase
            .from('messages')
            .select('*')
            .like('channel', selectedChannel)
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

    function handleNewMessage(user, newMessage, selectedChannel) {
        let message = {
            from: user,
            message: newMessage,
            channel: selectedChannel
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
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                backgroundColor: appConfig.theme.colors.neutrals[700],
                height: '100%',
                width: '100%',
                padding: '1rem',
            }}
        >

            <Header user={userName} channel={channel} />

            <Box styleSheet={{
                display: 'flex',
                height: '90%',
                marginBottom: '2rem',
            }}>

                <Channels
                    channelName={channel}
                    channelList={appConfig.ssbu.series}
                    styleSheet={{
                        display: 'flex'
                    }}
                    onChannelClick={(ch) => {
                        console.log("Channel before set: ", channel);
                        setChannel(ch);
                        fetchMessages(ch);
                        console.log("Channel after set: ", channel);
                    }}
                />

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        backgroundColor: appConfig.theme.colors.neutrals[900],
                        flexDirection: 'column',
                        padding: '16px',
                        backgroundImage: `url(${appConfig.ssbu.series.filter(ch => ch.name === channel)[0].icon})`,
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
                                    handleNewMessage(userName, message, channel);
                                }
                            }}
                            placeholder="Your message here..."
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
                            extaStickers={appConfig['ssbu-complete'].filter(e => e.series.name === channel)}
                            onStickerClick={(sticker) => {
                                handleNewMessage(userName, `sticker->${sticker}`, channel);
                            }}
                        />

                        <Button
                            label=''
                            iconName='FaTelegramPlane'
                            title='Send'
                            onClick={(event) => {
                                handleNewMessage(userName, message, channel);
                                document.getElementsByTagName('textarea')[0].focus();
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
    )
}

function Header(props) {
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
    return (
        <>
            <Box styleSheet={{ color: 'white', width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >

                {/* <Text>{props.user}</Text> */}
                <Text styleSheet={{ textAlign: 'left' }}>
                    {`${props.channel === SSB_GENERAL ? 'General' : 'Serie'} - ${props.channel}`}
                </Text>

                <Box styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                    cursor: 'pointer',
                }}

                    onClick={() => {
                        setIsDropdownVisible(!isDropdownVisible);
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '6%',
                            minWidth: '50px',
                            borderRadius: '50%',
                        }}
                        src={`https://github.com/${props.user}.png`}
                    />
                    <Icon
                        label="Dropdown Icon"
                        name="FaAngleDown"
                    />
                </Box>

                {isDropdownVisible &&
                    <Box styleSheet={{
                        position: 'absolute',
                        top: '4rem',
                        right: '2rem',
                        width: '30%',
                        minWidth: '300px',
                        maxWidth: '400px',
                        backgroundColor: appConfig.theme.colors.neutrals[500],
                        zIndex: '10',
                    }}>
                        <GitHubUserProfile userName={props.user} showPicture={false} />
                        <Button
                            variant='tertiary'
                            colorVariant='neutral'
                            label='Logout'
                            href="/"
                            fullWidth
                        />
                    </Box>
                }

            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);
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