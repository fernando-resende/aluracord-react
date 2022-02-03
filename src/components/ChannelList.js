import React from 'react';
import { Box, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export default function ChannelList() {
    return (
        <Box styleSheet={{ width: '60px', overflowY: 'auto' }}>
            {
                appConfig.ssbu.series.map((ssbu, index)=> {
                    return (<>
                        <Box title={index === 0 ? `General: ${ssbu.name}` : ssbu.name}
                        styleSheet={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: '50%', height: '45px', width: '45px', margin: '0.3rem 0',
                            backgroundColor: appConfig.theme.colors.primary[500]
                        }}>
                            <Image src={ssbu.icon}
                                styleSheet={{ width: '32px', height: 'auto' }} />
                        </Box>
                    </>)
                }
                )
            }
        </Box>
    )
}