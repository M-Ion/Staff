using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Staff.DAL.Migrations
{
    public partial class RemoveQuantityFromOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Order");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "Quantity",
                table: "Order",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);
        }
    }
}
