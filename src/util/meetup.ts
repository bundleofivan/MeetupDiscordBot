import { ButtonInteraction, CommandInteraction } from 'discord.js';
import { Logger } from 'tslog';
import { v4 as uuidv4 } from 'uuid';
import { BASIC_MEETUP_AUTH_SCOPES, generateOAuthUrl } from '../constants';
import { InMemoryCache } from '../lib/cache/memoryCache';
import { GqlMeetupClient } from '../lib/client/meetup/gqlClient';
import { spinWait } from './spinWait';

const logger = new Logger({ name: 'MeetupUtil' });

async function showMeetupTokenUrl(
  interaction: ButtonInteraction | CommandInteraction
) {
  const maskedUserId = uuidv4();
  logger.info(
    `Setting maskedUserId=${maskedUserId} for ${interaction.user.username}`
  );
  await InMemoryCache.instance().set(
    `maskedUserId-${maskedUserId}`,
    interaction.user.id
  );
  await interaction.editReply({
    content: `Please click on this link to get your Meetup Auth token: <${generateOAuthUrl(
      {
        name: 'meetup',
        tokenId: maskedUserId,
        scopes: BASIC_MEETUP_AUTH_SCOPES,
      }
    )}>`,
  });
}

/**
 * A wrapper for Meetup commands to handle:
 * 1. Authentication
 * 2. Grabbing token
 * @param commandFn Lambda for command implementation
 */
export async function withMeetupClient(
  interaction: ButtonInteraction | CommandInteraction,
  commandFn: (meetupClient: GqlMeetupClient) => Promise<void>
) {
  const tokenKey = `${interaction.user.id}-meetup-accessToken`;
  let token = await InMemoryCache.instance().get(tokenKey);
  if (!token) {
    logger.info(
      `Token not present for ${interaction.user.username} at ${tokenKey}. Getting token through OAuth`
    );
    await showMeetupTokenUrl(interaction);
    token = await spinWait(() => InMemoryCache.instance().get(tokenKey), {
      timeoutMs: 60 * 1000,
      message: 'Timeout waiting for Meetup authentication. Please try again',
      intervalMs: 1000,
    });
  }
  const client = new GqlMeetupClient(token);
  await commandFn(client);
}
