using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zero.Migrations;

/// <inheritdoc />
public partial class AddIdentityClient : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "AppIdentityClients",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                DisplayName = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                ProviderType = table.Column<int>(type: "int", nullable: false),
                ProviderName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                IsEnabled = table.Column<bool>(type: "bit", nullable: false),
                DisplayOrder = table.Column<int>(type: "int", nullable: false),
                IsDebugMode = table.Column<bool>(type: "bit", nullable: false),
                TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                RequiredClaimTypes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                DeleterId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
            },
            constraints: table => table.PrimaryKey("PK_AppIdentityClients", x => x.Id));

        migrationBuilder.CreateTable(
            name: "AppIdentityClientClaimMaps",
            columns: table => new
            {
                IdentityClientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                ClaimType = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                Action = table.Column<int>(type: "int", nullable: false),
                ValueFromType = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                RawValue = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AppIdentityClientClaimMaps", x => new { x.IdentityClientId, x.ClaimType });
                table.ForeignKey(
                    name: "FK_AppIdentityClientClaimMaps_AppIdentityClients_IdentityClientId",
                    column: x => x.IdentityClientId,
                    principalTable: "AppIdentityClients",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "AppIdentityClientConfigurations",
            columns: table => new
            {
                IdentityClientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AppIdentityClientConfigurations", x => new { x.IdentityClientId, x.Name });
                table.ForeignKey(
                    name: "FK_AppIdentityClientConfigurations_AppIdentityClients_IdentityClientId",
                    column: x => x.IdentityClientId,
                    principalTable: "AppIdentityClients",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_AppIdentityClients_CreationTime",
            table: "AppIdentityClients",
            column: "CreationTime",
            descending: new bool[0]);

        migrationBuilder.CreateIndex(
            name: "IX_AppIdentityClients_Name",
            table: "AppIdentityClients",
            column: "Name");

        migrationBuilder.CreateIndex(
            name: "IX_AppIdentityClients_ProviderName",
            table: "AppIdentityClients",
            column: "ProviderName");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "AppIdentityClientClaimMaps");

        migrationBuilder.DropTable(
            name: "AppIdentityClientConfigurations");

        migrationBuilder.DropTable(
            name: "AppIdentityClients");
    }
}
