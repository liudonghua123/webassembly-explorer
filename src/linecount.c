#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char* argv[]) {
    FILE* input = stdin;
    FILE* output = stdout;
    char* input_path = NULL;
    char* output_path = NULL;

    // 解析参数 (-i input_file, -o output_file)
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-i") == 0 && i + 1 < argc) {
            input_path = argv[++i];
            input = fopen(input_path, "r");
        } else if (strcmp(argv[i], "-o") == 0 && i + 1 < argc) {
            output_path = argv[++i];
            output = fopen(output_path, "w");
        }
    }

    if (!input) {
        fprintf(stderr, "Error opening input\n");
        return 1;
    }

    // 统计行数
    // 换行符计数 + 1（最后一行可能没有换行符）
    long lines = 0;
    int last_ch = 0;
    int ch;

    while ((ch = fgetc(input)) != EOF) {
        if (ch == '\n') {
            lines++;
        }
        last_ch = ch;
    }

    // 如果最后读取的字符不是换行符且不是 EOF 前刚读完（即有内容），则加1
    if (last_ch != '\n' && last_ch != 0) {
        lines++;
    }

    // 空文件行数为0
    if (last_ch == 0 && lines == 0) {
        lines = 0;
    }

    fprintf(output, "%ld\n", lines);

    if (input_path) fclose(input);
    if (output_path) fclose(output);

    return 0;
}