import { Component, OnInit, ViewChild } from "@angular/core";
import {NgFor, NgIf} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

export interface ogPermission {
  id: string;
  name: string;
  permissionGroup: string;
  groupSort: number;
  module: string;
  tooltip?: string;
  newName: string;
  deprecated: boolean;
  new: boolean;
}

export interface Module {
  name: string;
  groups: Array<Group>;
}

export interface Group {
  name: string;
  description: string;
  permissions: Array<Permission>;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  oldName: string;
  deprecated: boolean;
  new: boolean;
  tooltip?: string;
}

/**
 * @title Basic expansion panel
 */
@Component({
  selector: "permission-example",
  templateUrl: "permission-example.html",
  styleUrls: ["permission-example.css"],
  standalone: true,
  imports: [
    NgIf,
    
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PermissionExample implements OnInit {
  layout = new FormControl('');
  panelOpenState = false;

  modules = new Array<Module>();

  modulesByName = new Map<string, Module>();
  groupsByName = new Map<string, Group>();

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor() {
  }

  ngOnInit() {
    this.mapModulesAndGroups();
    this.mapPermissions();

    console.log(this.modules);
  }

  mapPermissions() {
    for (let permission of this.newPermissions) {
      // map modules
      let existingModule = this.modulesByName.get(permission.module);
      if (existingModule) {
        // map groups
        let groupKey = `${existingModule.name}::${permission.permissionGroup}`;
        let existingGroup = this.groupsByName.get(groupKey);
        if (existingGroup) {
          existingGroup.permissions.push({
            id: permission.id,
            name: permission.newName,
            description: permission.name,
            deprecated: permission.deprecated,
            new: permission.new,
            tooltip: permission.tooltip,
            oldName: permission.name,
          });
        }
      }
    }
  }

  mapModulesAndGroups() {
    for (let permission of this.newPermissions) {
      // map modules
      let existingModule = this.modulesByName.get(permission.module);
      if (existingModule) {
      } else {
        existingModule = <Module> {
          name: permission.module,
          groups: [],
        };
        this.modulesByName.set(existingModule.name, existingModule);
        this.modules.push(existingModule);
      }

      // map groups

      let groupKey = `${existingModule.name}::${permission.permissionGroup}`;

      let existingGroup = this.groupsByName.get(groupKey);
      if (existingGroup) {
      } else {
        existingGroup = <Group> {
          name: permission.permissionGroup?.replace(
            /([a-z0-9])([A-Z])/g,
            "$1 $2",
          ),
          description: permission.permissionGroup,
          permissions: [],
        };
        this.groupsByName.set(groupKey, existingGroup);
        existingModule.groups.push(existingGroup);
      }
    }
  }

  newPermissions: Array<ogPermission> = [
    {
      id: "PublicAlert",
      name: "SEND PUBLIC ALERT",
      newName: "SEND PUBLIC ALERT",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "PublicAlert",
      module: "Alerting",
      groupSort: 2,
    },
    {
      id: "PublicAlertReport",
      name: "Internal Public Alert History",
      newName: "Internal Public Alert History",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "PublicAlert",
      module: "Alerting",
      groupSort: 4,
    },
    {
      id: "PublicSignupReport",
      name: "Public Subscriber Alert History",
      newName: "Public Subscriber Alert History",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "PublicAlert",
      module: "Alerting",
      groupSort: 6,
    },
    {
      id: "PublicSignupManage",
      name: "Public Signups",
      newName: "Public Signups",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "PublicAlert",
      module: "Alerting",
      groupSort: 8,
    },
    {
      id: "FileimageUpload",
      name: "File-Image Upload",
      newName: "File-Image Upload",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "FileManagement",
      module: "FileManagement",
      groupSort: 2,
    },
    {
      id: "FilesManage",
      name: "Files",
      newName: "Files",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "FileManagement",
      module: "FileManagement",
      groupSort: 3,
    },
    {
      id: "ImagesView",
      name: "Images",
      newName: "Images",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "FileManagement",
      module: "FileManagement",
      groupSort: 4,
    },
    {
      id: "AdminManage",
      name: "Administrator Passwords",
      newName: "Administrator Passwords",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Administration",
      module: "Administration",
      groupSort: 2,
    },
    {
      id: "RegionSettingsManage",
      name: "Options-Settings",
      newName: "Options-Settings",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Administration",
      module: "Administration",
      groupSort: 4,
    },
    {
      id: "PronunciationManage",
      name: "Pronunciation",
      newName: "Pronunciation",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Administration",
      module: "Administration",
      groupSort: 6,
    },
    {
      id: "AdminLoginsReport",
      name: "Current Admin Logins",
      newName: "Current Admin Logins",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Administration",
      module: "Administration",
      groupSort: 14,
    },
    {
      id: "VoiceCallAndFaxReport",
      name: "Usage Report",
      newName: "Usage Report",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Administration",
      module: "Administration",
      groupSort: 18,
    },
    {
      id: "InternalMembersManage",
      name: "Internal Members",
      newName: "Manage Internal Contacts",
      deprecated: false,
      new: true,
      tooltip: 'Creating, Editing, and Deleting of Internal Contacts are now controlled by the Manage Internal Contacts Permission',
      permissionGroup: "InternalContacts",
      module: "Contact Management",
      groupSort: 2,
    },
    {
      id: "InternalMembersEdit",
      name: "EDIT Internal Members Allowed",
      newName: "EDIT Internal Members Allowed",
      deprecated: true,
      new: false,
      tooltip: 'This permission has been deprecated in favor of Manage Internal Contacts which controls the ability to edit Internal Contacts',
      permissionGroup: "InternalContacts",
      module: "Contact Management",
      groupSort: 4,
    },
    {
      id: "InternalMembersView",
      name: "VIEW ONLY Internal Member Details",
      newName: "View Internal Contacts",
      deprecated: false,
      new: true,
      tooltip: 'Allows the viewing of Internal Contacts from other modules.',
      permissionGroup: "InternalContacts",
      module: "Contact Management",
      groupSort: 6,
    },
    {
      id: "InternalMemberProfileUpdateManage",
      name: "Profile Update Reminder",
      newName: "Profile Update Reminder",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Utilities",
      module: "Contact Management",
      groupSort: 7,
    },
    {
      id: "InternalGroupsManage",
      name: "Internal Groups",
      newName: "Internal Groups",
      deprecated: false,
      new: true,
      tooltip: 'Creating, Editing, and Deleting of Internal Groups are now controlled by the Manage Internal Groups Permission',
      permissionGroup: "InternalContacts",
      module: "Contact Management",
      groupSort: 3,
    },
    {
      id: "EtnAlertSend",
      name: "SEND ETN ALERT",
      newName: "SEND ETN ALERT",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "EtnAlert",
      module: "Alerting",
      groupSort: 2,
    },
    {
      id: "EtnAlertReport",
      name: "ETN Alert History",
      newName: "ETN Alert History",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "EtnAlert",
      module: "Alerting",
      groupSort: 4,
    },
    {
      id: "EtnPublicSignupEnable",
      name: "Allow Callout to Public Signups",
      newName: "Allow Callout to Public Signups",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "EtnAlert",
      module: "Alerting",
      groupSort: 6,
    },
    {
      id: "AlertReportExport",
      name: "Export Alert History",
      newName: "Export Alert History",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "AlertHistory",
      module: "Alerting",
      groupSort: 0,
    },
    {
      id: "AlertReportMiniButtonShow",
      name: "Mini Console History Button",
      newName: "Mini Console History Button",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "AlertHistory",
      module: "Alerting",
      groupSort: 2,
    },
    {
      id: "AlertTelephonyEnable",
      name: "Voice Channel (Text-to-Speech)",
      newName: "Voice Channel (Text-to-Speech)",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "DeliveryChannels",
      module: "Alerting",
      groupSort: 10,
    },
    {
      id: "AlertFaxEnable",
      name: "Faxing Channel",
      newName: "Faxing Channel",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "DeliveryChannels",
      module: "Alerting",
      groupSort: 12,
    },
    {
      id: "RegionSettingAuthCodeEnable",
      name: "Modify Authorization Codes",
      newName: "Modify Authorization Codes",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Administration",
      module: "Administration",
      groupSort: 26,
    },
    {
      id: "AlertEmailConfirmationEnable",
      name: "Email Confirmation",
      newName: "Email Confirmation",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "DeliveryChannels",
      module: "Alerting",
      groupSort: 2,
    },
    {
      id: "QuickAlertSend",
      name: "INTERNAL ALERT",
      newName: "INTERNAL ALERT",
      deprecated: true,
      new: true,
      tooltip: 'This permission will be deprecated on 3/12/2024. It will be replaced with a new Send Alert permission.',
      permissionGroup: "QuickAlert",
      module: "Alerting",
      groupSort: 1,
    },
    {
      id: "QuickAlertReport",
      name: "Internal Alert History",
      newName: "Internal Alert History",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "QuickAlert",
      module: "Alerting",
      groupSort: 2,
    },
    {
      id: "QuickAlertScheduledManage",
      name: "Scheduled Alerts",
      newName: "Scheduled Alerts",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "QuickAlert",
      module: "Alerting",
      groupSort: 10,
    },
    {
      id: "AlertPollingEnabled",
      name: "Survey / Polling",
      newName: "Survey / Polling",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "QuickAlert",
      module: "Alerting",
      groupSort: 12,
    },
    {
      id: "AlertPriorityEnabled",
      name: "Priority",
      newName: "Priority",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "QuickAlert",
      module: "Alerting",
      groupSort: 15,
    },
    {
      id: "SocialMediaSend",
      name: "SEND SOCIAL MEDIA",
      newName: "SEND SOCIAL MEDIA",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "SocialMedia",
      module: "Social Media",
      groupSort: 1,
    },
    {
      id: "SocialMediaReport",
      name: "Social Media History",
      newName: "Social Media History",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "SocialMedia",
      module: "Social Media",
      groupSort: 2,
    },
    {
      id: "SocialMediaManage",
      name: "Social Media Accounts",
      newName: "Social Media Accounts",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Administration",
      module: "Social Media",
      groupSort: 7,
    },
    {
      id: "AlertMobileApp",
      name: "Mobile App Channel",
      newName: "Mobile App Channel",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "DeliveryChannels",
      module: "Alerting",
      groupSort: 0,
    },
    {
      id: "AlertWorkflow",
      name: "Workflow Polling",
      newName: "Workflow Polling",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "QuickAlert",
      module: "Alerting",
      groupSort: 11,
    },
    {
      id: "SmsAdminEnable",
      name: "SMS Priority",
      newName: "SMS Priority",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "DeliveryChannels",
      module: "Alerting",
      groupSort: 6,
    },
    {
      id: "SmsPollingEnabled",
      name: "SMS Polling",
      newName: "SMS Polling",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "DeliveryChannels",
      module: "Alerting",
      groupSort: 7,
    },
    {
      id: "QuickAlertEsriMap",
      name: "ESRI Map",
      newName: "ESRI Map",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "QuickAlert",
      module: "Alerting",
      groupSort: 21,
    },
    {
      id: "RoleManagement",
      name: "Role Management",
      newName: "Role Management",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Administration",
      module: "Administration",
      groupSort: 19,
    },
    {
      id: "TasklistsWatcher",
      name: "Can watch tasklists",
      newName: "Can watch tasklists",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Tasklists",
      module: "Tasklists",
      groupSort: 2,
    },
    {
      id: "TasklistsAssigned",
      name: "Can be assigned tasklists",
      newName: "Can be assigned tasklists",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Tasklists",
      module: "Tasklists",
      groupSort: 1,
    },
    {
      id: "InitiateChat",
      name: "Initiate chats",
      newName: "Initiate chats",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Chat",
      module: "Chat",
      groupSort: 1,
    },
    {
      id: "TasklistsManageTemplates",
      name: "Manage templates",
      newName: "Manage templates",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Tasklists",
      module: "Tasklists",
      groupSort: 4,
    },
    {
      id: "TasklistsActivateTemplate",
      name: "Activate templates",
      newName: "Activate templates",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Tasklists",
      module: "Tasklists",
      groupSort: 5,
    },
    {
      id: "IncidentManagement",
      name: "Incident Management",
      newName: "Incident Management",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Administration",
      module: "Administration",
      groupSort: 21,
    },
    {
      id: "TasklistsManageCreate",
      name: "Create activated tasklists",
      newName: "Create activated tasklists",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Tasklists",
      module: "Tasklists",
      groupSort: 6,
    },
    {
      id: "TasklistsManager",
      name: "Can manage tasklists",
      newName: "Can manage tasklists",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Tasklists",
      module: "Tasklists",
      groupSort: 3,
    },
    {
      id: "TasklistsMonitor",
      name: "Monitor all tasklists",
      newName: "Monitor all tasklists",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Tasklists",
      module: "Tasklists",
      groupSort: 7,
    },
    {
      id: "MobileBeaconUser",
      name: "Mobile Beacon User",
      newName: "Mobile Beacon User",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "MobileBeacon",
      module: "Alerting",
      groupSort: 1,
    },
    {
      id: "ChannelDefaultsManage",
      name: "Manage Channel Defaults",
      newName: "Manage Channel Defaults",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Settings",
      module: "Alerting",
      groupSort: 1,
    },
    {
      id: "CustomAlertFormsManage",
      name: "Manage Custom Alert Forms",
      newName: "Manage Custom Alert Forms",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Settings",
      module: "Alerting",
      groupSort: 2,
    },
    {
      id: "BalsaInlineHickory",
      name: "Access New WebUI",
      newName: "Access New WebUI",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "InternalUseOnly",
      module: "InternalUseOnly",
      groupSort: 4,
    },
    {
      id: "AlertTemplatesManage",
      name: "Manage Alert Templates",
      newName: "Manage Alert Templates",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Templates",
      module: "Alerting",
      groupSort: 3,
    },
    {
      id: "EmailChannel",
      name: "Email Channel",
      newName: "Email Channel",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "DeliveryChannels",
      module: "Alerting",
      groupSort: 1,
    },
    {
      id: "TextChannel",
      name: "Text Message Channel",
      newName: "Text Message Channel",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "DeliveryChannels",
      module: "Alerting",
      groupSort: 5,
    },
    {
      id: "BalsaUserNavigation",
      name: "Custom menu for web interface",
      newName: "Custom menu for web interface",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "InternalUseOnly",
      module: "InternalUseOnly",
      groupSort: 9,
    },
    {
      id: "KeywordsManage",
      name: "Manage Keywords",
      newName: "Manage Keywords",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Keywords",
      module: "Keywords",
      groupSort: 1,
    },
    {
      id: "IntegrationsManage",
      name: "Manage Integrations",
      newName: "Manage Integrations",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Integrations",
      module: "Integrations",
      groupSort: 1,
    },
    {
      id: "BrandingManage",
      name: "Manage Branding",
      newName: "Manage Branding",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Branding",
      module: "Branding",
      groupSort: 1,
    },
    {
      id: "TasklistsModifyOnActivation",
      name: "Can modify task lists on activation",
      newName: "Can modify task lists on activation",
      deprecated: false,
      new: false,
      tooltip: '',
      permissionGroup: "Tasklists",
      module: "Tasklists",
      groupSort: 10,
    },
  ];
}

/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
