import React from 'react';
import { Box, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export default function UserProfile(props) {
    return (
        <>
            <Box styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem',
            }}>
                <Image
                    styleSheet={{
                        borderRadius: '50%',
                        width: '30%',
                        maxWidth: '10rem',
                        border: `5px solid ${appConfig.theme.colors.primary['500']}`,
                    }}
                    src={`https://github.com/${props.userName}.png`}
                />
                <Box>
                    {/* <Image
                        src={`https://github-readme-stats.vercel.app/api?username=${props.userName}&theme=dark&show_icons=true&count_private=true`}
                    /> */}
                    <Image
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${props.userName}&layout=compact&theme=dark`}
                    />
                </Box>
            </Box>
        </>
    );
}