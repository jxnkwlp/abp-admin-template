using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zero.Migrations;

/// <inheritdoc />
public partial class AddFileManagement : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "AppFileAccessTokens",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                FileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Token = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                ExpirationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                DownloadCount = table.Column<long>(type: "bigint", nullable: false),
                ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
            },
            constraints: table => table.PrimaryKey("PK_AppFileAccessTokens", x => x.Id));

        migrationBuilder.CreateTable(
            name: "AppFileContainers",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                AccessMode = table.Column<int>(type: "int", nullable: false),
                Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                MaximumEachFileSize = table.Column<long>(type: "bigint", nullable: false),
                MaximumFileQuantity = table.Column<int>(type: "int", nullable: false),
                OverrideBehavior = table.Column<int>(type: "int", nullable: false),
                AllowAnyFileExtension = table.Column<bool>(type: "bit", nullable: false),
                AllowedFileExtensions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                ProhibitedFileExtensions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                AutoDeleteBlob = table.Column<bool>(type: "bit", nullable: false),
                FilesCount = table.Column<int>(type: "int", nullable: false),
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
            constraints: table => table.PrimaryKey("PK_AppFileContainers", x => x.Id));

        migrationBuilder.CreateTable(
            name: "AppFiles",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                ContainerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                ParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                IsDirectory = table.Column<bool>(type: "bit", nullable: false),
                FileName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                UniqueId = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                MimeType = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                Length = table.Column<long>(type: "bigint", nullable: false),
                BlobName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                Hash = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
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
            constraints: table => table.PrimaryKey("PK_AppFiles", x => x.Id));

        migrationBuilder.CreateIndex(
            name: "IX_AppFileAccessTokens_FileId",
            table: "AppFileAccessTokens",
            column: "FileId");

        migrationBuilder.CreateIndex(
            name: "IX_AppFileAccessTokens_Token",
            table: "AppFileAccessTokens",
            column: "Token");

        migrationBuilder.CreateIndex(
            name: "IX_AppFileContainers_Name",
            table: "AppFileContainers",
            column: "Name");

        migrationBuilder.CreateIndex(
            name: "IX_AppFiles_ContainerId",
            table: "AppFiles",
            column: "ContainerId");

        migrationBuilder.CreateIndex(
            name: "IX_AppFiles_CreationTime",
            table: "AppFiles",
            column: "CreationTime",
            descending: new bool[0]);

        migrationBuilder.CreateIndex(
            name: "IX_AppFiles_FileName",
            table: "AppFiles",
            column: "FileName");

        migrationBuilder.CreateIndex(
            name: "IX_AppFiles_Hash",
            table: "AppFiles",
            column: "Hash");

        migrationBuilder.CreateIndex(
            name: "IX_AppFiles_UniqueId",
            table: "AppFiles",
            column: "UniqueId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "AppFileAccessTokens");

        migrationBuilder.DropTable(
            name: "AppFileContainers");

        migrationBuilder.DropTable(
            name: "AppFiles");
    }
}
