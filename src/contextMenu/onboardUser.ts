import {
  ApplicationCommandType,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import { ContextMenu, Discord } from 'discordx';
import { onboardUser } from '../lib/helpers/onboardUser';
import { discordCommandWrapper } from '../util/discord';

@Discord()
export class OnboardUserContextCommands {
  @ContextMenu({
    name: 'onboard_members',
    type: ApplicationCommandType.Message,
  })
  async onboardNonLadiesMsgHandler(
    interaction: MessageContextMenuCommandInteraction
  ) {
    await discordCommandWrapper(interaction, async () => {
      const { targetMessage } = interaction;
      await onboardUser(interaction, targetMessage.author.id, false, false);
    });
  }

  @ContextMenu({
    name: 'onboard_ladies',
    type: ApplicationCommandType.Message,
  })
  async onboardLadiesMsgHandler(
    interaction: MessageContextMenuCommandInteraction
  ) {
    await discordCommandWrapper(interaction, async () => {
      const { targetMessage } = interaction;
      await onboardUser(interaction, targetMessage.author.id, true, false);
    });
  }

  @ContextMenu({
    name: 'onboard_mens',
    type: ApplicationCommandType.Message,
  })
  async onboardMensMsgHandler(
    interaction: MessageContextMenuCommandInteraction
  ) {
    await discordCommandWrapper(interaction, async () => {
      const { targetMessage } = interaction;
      await onboardUser(interaction, targetMessage.author.id, false, true);
    });
  }

  @ContextMenu({
    name: 'onboard_members',
    type: ApplicationCommandType.User,
  })
  async onboardNonLadiesUserHandler(
    interaction: UserContextMenuCommandInteraction
  ) {
    await discordCommandWrapper(interaction, async () => {
      const { targetUser } = interaction;
      await onboardUser(interaction, targetUser.id, false, false);
    });
  }

  @ContextMenu({
    name: 'onboard_ladies',
    type: ApplicationCommandType.User,
  })
  async onboardLadiesUserHandler(
    interaction: UserContextMenuCommandInteraction
  ) {
    await discordCommandWrapper(interaction, async () => {
      const { targetUser } = interaction;
      await onboardUser(interaction, targetUser.id, true, false);
    });
  }

  @ContextMenu({
    name: 'onboard_mens',
    type: ApplicationCommandType.User,
  })
  async onboardMensUserHandler(interaction: UserContextMenuCommandInteraction) {
    await discordCommandWrapper(interaction, async () => {
      const { targetUser } = interaction;
      await onboardUser(interaction, targetUser.id, false, true);
    });
  }
}
