using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zero.Migrations;

/// <inheritdoc />
public partial class AddDictionaryManagement : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "AppDictionaryGroups",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                DisplayName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                ParentName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                Description = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                IsPublic = table.Column<bool>(type: "bit", nullable: false),
                TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
            },
            constraints: table => table.PrimaryKey("PK_AppDictionaryGroups", x => x.Id));

        migrationBuilder.CreateTable(
            name: "AppDictionaryItems",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                DisplayName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                DisplayOrder = table.Column<int>(type: "int", nullable: false),
                IsEnabled = table.Column<bool>(type: "bit", nullable: false),
                GroupName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                Description = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
            },
            constraints: table => table.PrimaryKey("PK_AppDictionaryItems", x => x.Id));

        migrationBuilder.CreateIndex(
            name: "IX_AppDictionaryGroups_CreationTime",
            table: "AppDictionaryGroups",
            column: "CreationTime",
            descending: new bool[0]);

        migrationBuilder.CreateIndex(
            name: "IX_AppDictionaryGroups_Name",
            table: "AppDictionaryGroups",
            column: "Name",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_AppDictionaryGroups_ParentName",
            table: "AppDictionaryGroups",
            column: "ParentName");

        migrationBuilder.CreateIndex(
            name: "IX_AppDictionaryItems_CreationTime",
            table: "AppDictionaryItems",
            column: "CreationTime",
            descending: new bool[0]);

        migrationBuilder.CreateIndex(
            name: "IX_AppDictionaryItems_GroupName",
            table: "AppDictionaryItems",
            column: "GroupName");

        migrationBuilder.CreateIndex(
            name: "IX_AppDictionaryItems_Name",
            table: "AppDictionaryItems",
            column: "Name",
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "AppDictionaryGroups");

        migrationBuilder.DropTable(
            name: "AppDictionaryItems");
    }
}
