import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function StickerButton({ extaStickers = [], onStickerClick, ...props }) {
    const [isOpen, setOpenState] = React.useState('');

    return (
        <Box
            styleSheet={{
                position: 'relative',
            }}
        >
            <Button
                title='Sticker'
                styleSheet={{
                    borderRadius: '50%',
                    padding: '0 3px 0 0',
                    minWidth: '50px',
                    minHeight: '50px',
                    fontSize: '20px',
                    lineHeight: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals[300],
                    filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
                    hover: {
                        filter: 'grayscale(0)',
                    }
                }}
                label="😋"
                onClick={() => setOpenState(!isOpen)}
            />
            {isOpen && (
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        position: 'absolute',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        width: {
                            xs: '200px',
                            sm: '290px',
                        },
                        height: '300px',
                        right: '30px',
                        bottom: '30px',
                        padding: '16px',
                        boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
                    }}
                    onClick={() => setOpenState(false)}
                >
                    <Text
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals["000"],
                            fontWeight: 'bold',
                        }}
                    >
                        Stickers
                    </Text>
                    <Box
                        tag="ul"
                        styleSheet={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingTop: '16px',
                            overflowY: 'scroll',
                        }}
                    >
                        {extaStickers.map((extraSticker) =>
                            <>
                                <Sticker sticker={extraSticker.images.icon} onStickerClick={onStickerClick} />
                                <Sticker sticker={extraSticker.images.portrait} onStickerClick={onStickerClick} />
                            </>
                        )}

                        {appConfig.stickers.map((mainSticker) => (
                            <Sticker sticker={mainSticker} onStickerClick={onStickerClick} />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}

function Sticker({ sticker, onStickerClick }) {
    return (
        <>
            <Text
                onClick={() => {
                    if (Boolean(onStickerClick)) {
                        onStickerClick(sticker);
                    }
                }}
                tag="li" key={sticker}
                styleSheet={{
                    width: '50%',
                    borderRadius: '5px',
                    padding: '10px',
                    focus: {
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                    },
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                    }
                }}
            >
                <Image src={sticker} />
            </Text>
        </>
    )
}