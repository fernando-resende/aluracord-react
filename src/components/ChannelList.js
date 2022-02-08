import React from 'react';
import { Box, Button, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export default function Channels({ channelName, channelList, onChannelClick, ...props }) {
    return (
        <Box styleSheet={{ width: '60px', overflowY: 'auto' }}>
            {
                channelList.map((channel, index) => {
                    return (<>
                        <Box title={index === 0 ? `General: ${channel.name}` : `Serie: ${channel.name}`}
                            styleSheet={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: '50%', height: '45px', width: '45px', margin: '0.3rem 0',
                                backgroundColor: channel.name === channelName ? appConfig.theme.colors.primary[500] : appConfig.theme.colors.neutrals[500],
                                cursor: 'pointer',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.primary[100],
                                },
                                focus: {
                                    backgroundColor: appConfig.theme.colors.primary[500],
                                },
                            }}
                            onClick={() => {
                                if(Boolean(onChannelClick)) onChannelClick(channel.name)
                            }}
                        >
                            <Image src={channel.icon}
                                styleSheet={{ width: '32px', height: 'auto' }} />
                        </Box>
                    </>)
                }
                )
            }
        </Box>
    )
}