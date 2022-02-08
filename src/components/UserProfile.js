import React from 'react';
import { Box, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export default function GitHubUserProfile({ userName, direction = 'column', pictureSize = '30%', showPicture = true, showStatsCard = true, showTopLanguagesCard = true, ...props }) {
    const [isVisiblePicture, setisVisiblePicture] = React.useState(true);
    const [isVisibleStatsCard, setisVisibleStatsCard] = React.useState(true);
    const [isVisibleTopLanguagesCard, setisVisibleTopLanguagesCard] = React.useState(true);

    return (
        <>
            <Box styleSheet={{
                display: 'flex',
                flexDirection: direction,
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                padding: '0.5rem',
            }}>
                {showPicture &&
                    <Image
                        styleSheet={{
                            borderRadius: '50%',
                            width: pictureSize,
                            maxWidth: '10rem',
                            border: `5px solid ${appConfig.theme.colors.primary['500']}`,
                        }}
                        src={`https://github.com/${userName}.png`}
                    />
                }

                {showStatsCard &&
                    <Image
                    styleSheet={{
                        width: '100%',
                    }}
                        src={`https://github-readme-stats.vercel.app/api?username=${userName}&theme=dark&show_icons=true&count_private=true`}
                    />
                }
                {showTopLanguagesCard &&
                    <Image
                    styleSheet={{
                        width: '100%',
                    }}
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${userName}&layout=compact&theme=dark`}
                    />
                }
            </Box>
        </>
    );
}