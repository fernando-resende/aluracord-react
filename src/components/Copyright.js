import { Box } from "@skynexui/components";

export default function Copyright() {
    return (
        <Box tag="footer" as="footer" styleSheet={{padding: '1rem'}}>
            <style jsx>{`
              small{
                  color: white;
                  display: block;
                  font-size: 0.5rem;
              }
              `}
              </style>
            <small>
                Super Smash Bros Ultimate© is a registered mark of Nintendo (2018). All rights reserved.
            </small>

            <small>
                Original Game: © Nintendo / HAL Laboratory, Inc.
            </small>

            <small>
                Characters: © Nintendo / HAL Laboratory, Inc. / Pokémon. / Creatures Inc. / GAME FREAK inc. / SHIGESATO ITOI / APE inc. / INTELLIGENT SYSTEMS / Konami Digital Entertainment / SEGA / CAPCOM CO., LTD. / BANDAI NAMCO Entertainment Inc. / MONOLITHSOFT / CAPCOM U.S.A., INC. / SQUARE ENIX CO., LTD. / ATLUS / Microsoft / SNK CORPORATION. / Mojang AB / Disney
            </small>
        </Box>
    )
}